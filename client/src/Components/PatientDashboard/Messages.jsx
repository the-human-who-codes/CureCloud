import { useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi, usePagedApi } from "../../hooks/useApi";
import { conversationTitle } from "../../utils/conversations";
import { labelFor, relativeTime } from "../../utils/format";
import AsyncContent, { ErrorMessage, LoadMore } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Checkbox, FormField } from "../common/FormField";
import Modal from "../common/Modal";
import { PageHeader, PageShell } from "../common/PageShell";
import ConversationThread from "../Chat/ConversationThread";

// Starts a `patient` conversation with members of the patient's care team.
function NewConversation({ patientId, onClose, onCreated }) {
  const careTeam = useApi(() => api.getCareTeam(patientId), [patientId]);
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState("");
  const create = useAction(async () => {
    const conversation = await api.createConversation({
      type: "patient",
      patientId,
      participantIds: selected,
      ...(title.trim() && { title: title.trim() }),
    });
    onCreated(conversation);
  });
  const toggle = (id, on) =>
    setSelected((s) => (on ? [...s, id] : s.filter((x) => x !== id)));

  return (
    <Modal
      title="New message"
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => create.run()}
            disabled={create.busy || selected.length === 0}
          >
            Start conversation
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <ErrorMessage error={create.error} />
        <p className="font-poppins text-sm text-ink">
          Choose who on your care team should receive your messages.
        </p>
        <AsyncContent
          {...careTeam}
          empty={careTeam.data?.data.length === 0}
          emptyText="You have no care team yet. Book an appointment first."
        >
          {careTeam.data?.data.map((p) => (
            <Checkbox
              key={p.id}
              label={`${p.name} · ${labelFor(p.role)}${
                p.specialization ? ` (${p.specialization})` : ""
              }`}
              checked={selected.includes(p.id)}
              onChange={(on) => toggle(p.id, on)}
            />
          ))}
        </AsyncContent>
        <FormField
          label="Subject (optional)"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </Modal>
  );
}

NewConversation.propTypes = {
  patientId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func.isRequired,
};

// The patient's conversations with their care team (the staff side lives in TeamChat).
function Messages() {
  const { user, patient } = useAuth();
  const [params, setParams] = useSearchParams();
  const [creating, setCreating] = useState(false);
  const conversations = usePagedApi((cursor) =>
    api.listConversations({ type: "patient", cursor })
  );
  const selectedId = params.get("c") ?? conversations.items[0]?.id;
  const selected = conversations.items.find((c) => c.id === selectedId);

  const select = (id) => {
    setParams({ c: id });
    conversations.setItems((items) =>
      items.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  return (
    <PageShell>
      <PageHeader
        title="Messages"
        subtitle="Talk to your care team"
        actions={
          patient && (
            <Button icon={faPlus} onClick={() => setCreating(true)}>
              New message
            </Button>
          )
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padded={false}>
          <AsyncContent
            loading={conversations.loading}
            error={conversations.error}
            empty={conversations.items.length === 0}
            emptyText="No conversations yet."
          >
            <ul className="divide-y divide-line">
              {conversations.items.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => select(c.id)}
                    className={`w-full text-left p-4 hover:bg-surface ${
                      c.id === selectedId ? "bg-surface" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-poppins font-medium text-primary">
                        {conversationTitle(c, user.id)}
                      </p>
                      {c.unreadCount > 0 && (
                        <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="font-poppins text-sm text-ink truncate">
                      {c.lastMessage
                        ? `${c.lastMessage.senderName}: ${c.lastMessage.text}`
                        : "No messages yet"}
                    </p>
                    <p className="font-poppins text-xs text-ink-muted">
                      {relativeTime(c.lastMessageAt)}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
            <LoadMore {...conversations} />
          </AsyncContent>
        </Card>
        <Card padded={false} className="lg:col-span-2">
          {selected ? (
            <>
              <div className="p-4 border-b border-line">
                <h2 className="font-poppins font-semibold text-primary">
                  {conversationTitle(selected, user.id)}
                </h2>
                <p className="font-poppins text-xs text-ink">
                  {Object.values(selected.participants)
                    .map((p) => `${p.name} (${labelFor(p.role)})`)
                    .join(", ")}
                </p>
              </div>
              <ConversationThread
                key={selected.id}
                conversation={selected}
                onActivity={() => conversations.reload()}
              />
            </>
          ) : (
            <p className="p-6 font-poppins text-ink">
              Select a conversation or start a new one.
            </p>
          )}
        </Card>
      </div>
      {creating && patient && (
        <NewConversation
          patientId={patient.id}
          onClose={() => setCreating(false)}
          onCreated={(c) => {
            setCreating(false);
            conversations.reload();
            setParams({ c: c.id });
          }}
        />
      )}
    </PageShell>
  );
}

export default Messages;

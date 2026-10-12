import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faHashtag,
  faPlus,
  faSearch,
  faUserInjured,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { api, listAll } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi, usePagedApi } from "../../hooks/useApi";
import { conversationTitle } from "../../utils/conversations";
import { labelFor, relativeTime } from "../../utils/format";
import AsyncContent, { ErrorMessage, LoadMore } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { FormField } from "../common/FormField";
import InitialsAvatar from "../common/InitialsAvatar";
import Modal from "../common/Modal";
import { PatientPicker, PractitionerPicker } from "../common/SearchPicker";
import ConversationThread from "../Chat/ConversationThread";

// Start a direct or group conversation, a patient conversation, or (admins) a channel.
function NewConversation({ kind, onClose, onCreated }) {
  const { isSystemAdmin } = useAuth();
  const [people, setPeople] = useState([]);
  const [pick, setPick] = useState(null);
  const [patient, setPatient] = useState(null);
  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [facilityId, setFacilityId] = useState("");
  const departments = useApi(
    () =>
      kind === "channel" && (!isSystemAdmin || facilityId)
        ? listAll(api.listDepartments, {
            facilityId: isSystemAdmin ? facilityId : undefined,
            status: "active",
          })
        : Promise.resolve([]),
    [kind, facilityId]
  );
  const facilities = useApi(
    () =>
      kind === "channel" && isSystemAdmin
        ? listAll(api.listFacilities, { status: "active" })
        : Promise.resolve([]),
    [kind]
  );

  const create = useAction(async () => {
    let body;
    if (kind === "channel")
      body = {
        type: "channel",
        title: title.trim(),
        ...(departmentId && { departmentId }),
        ...(isSystemAdmin && { facilityId }),
      };
    else if (kind === "patient")
      body = {
        type: "patient",
        patientId: patient.id,
        participantIds: [patient.userId],
        ...(title.trim() && { title: title.trim() }),
      };
    else
      body = {
        type: people.length > 1 ? "group" : "direct",
        participantIds: people.map((p) => p.id),
        ...(people.length > 1 && { title: title.trim() }),
      };
    onCreated(await api.createConversation(body));
  });

  const ready =
    kind === "channel"
      ? title.trim() && (!isSystemAdmin || facilityId)
      : kind === "patient"
      ? patient?.userId
      : people.length === 1 || (people.length > 1 && title.trim());

  return (
    <Modal
      title={
        kind === "channel"
          ? "New channel"
          : kind === "patient"
          ? "Message a patient"
          : "New conversation"
      }
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!ready || create.busy} onClick={() => create.run()}>
            Create
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <ErrorMessage error={create.error} />
        {kind === "direct" && (
          <>
            <PractitionerPicker
              label="Add people"
              value={pick}
              exclude={people.map((p) => p.id)}
              onChange={(p) => {
                if (p) setPeople([...people, p]);
                setPick(null);
              }}
            />
            {people.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {people.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className="px-3 py-1 bg-surface rounded-full font-poppins text-sm text-primary"
                      title="Remove"
                      onClick={() =>
                        setPeople(people.filter((x) => x.id !== p.id))
                      }
                    >
                      {p.name} ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {people.length > 1 && (
              <FormField
                label="Group name"
                value={title}
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
              />
            )}
          </>
        )}
        {kind === "patient" && (
          <>
            <PatientPicker value={patient} onChange={setPatient} />
            {patient && !patient.userId && (
              <p className="font-poppins text-sm text-red-600">
                This patient has no CureCloud account to message.
              </p>
            )}
            <FormField
              label="Subject (optional)"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        )}
        {kind === "channel" && (
          <>
            <FormField
              label="Channel name"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
            />
            {isSystemAdmin && (
              <FormField
                as="select"
                label="Facility"
                value={facilityId}
                onChange={(e) => setFacilityId(e.target.value)}
              >
                <option value="">Choose a facility</option>
                {(facilities.data ?? []).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </FormField>
            )}
            <FormField
              as="select"
              label="Department"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">Whole facility</option>
              {(departments.data ?? []).map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </FormField>
          </>
        )}
      </div>
    </Modal>
  );
}

NewConversation.propTypes = {
  kind: PropTypes.oneOf(["direct", "patient", "channel"]).isRequired,
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func.isRequired,
};

const SECTIONS = [
  { key: "channel", label: "Channels", icon: faHashtag, types: ["channel"] },
  {
    key: "direct",
    label: "Direct Messages",
    icon: faUsers,
    types: ["direct", "group"],
  },
  {
    key: "patient",
    label: "Patients",
    icon: faUserInjured,
    types: ["patient"],
  },
];

// Staff messaging: channels, direct and group conversations, and patient conversations.
function TeamChat() {
  const { user, can } = useAuth();
  const [params, setParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [creating, setCreating] = useState(null);
  const conversations = usePagedApi((cursor) =>
    api.listConversations({ cursor, limit: 50 })
  );
  const archive = useAction(async (id) => {
    const updated = await api.updateConversation(id, { status: "archived" });
    conversations.setItems((items) =>
      items.map((c) => (c.id === id ? updated : c))
    );
  });

  const term = searchTerm.trim().toLowerCase();
  const visible = conversations.items.filter((c) =>
    conversationTitle(c, user.id).toLowerCase().includes(term)
  );
  const selectedId = params.get("c") ?? visible[0]?.id;
  const selected = conversations.items.find((c) => c.id === selectedId);
  const isAdmin = can("channel:manage");
  const clinical = user.role === "doctor" || user.role === "nurse";

  const select = (id) => {
    setParams({ c: id });
    conversations.setItems((items) =>
      items.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)] bg-surface">
      <div className="w-80 border-r border-line bg-white flex flex-col">
        <div className="p-4 border-b border-line flex items-center gap-3">
          <InitialsAvatar
            name={user.name}
            photoUrl={user.photoUrl ?? undefined}
          />
          <div>
            <h3 className="font-poppins font-medium text-primary">
              {user.name}
            </h3>
            <p className="font-poppins text-sm text-ink">
              {labelFor(user.role)}
            </p>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search conversations..."
              aria-label="Search conversations"
              className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-line focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {user.role !== "patient" && (
              <Button
                size="sm"
                variant="secondary"
                icon={faPlus}
                onClick={() => setCreating("direct")}
              >
                Message
              </Button>
            )}
            {clinical && (
              <Button
                size="sm"
                variant="secondary"
                icon={faUserInjured}
                onClick={() => setCreating("patient")}
              >
                Patient
              </Button>
            )}
            {isAdmin && (
              <Button
                size="sm"
                variant="secondary"
                icon={faHashtag}
                onClick={() => setCreating("channel")}
              >
                Channel
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AsyncContent
            loading={conversations.loading}
            error={conversations.error}
            empty={visible.length === 0}
            emptyText="No conversations yet."
          >
            {SECTIONS.map((section) => {
              const items = visible.filter((c) =>
                section.types.includes(c.type)
              );
              if (!items.length) return null;
              return (
                <div key={section.key} className="px-4 pb-4">
                  <h4 className="font-poppins text-xs font-semibold text-ink-muted uppercase mb-2">
                    {section.label}
                  </h4>
                  <ul className="space-y-1">
                    {items.map((c) => (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => select(c.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg ${
                            c.id === selectedId
                              ? "bg-surface-tint"
                              : "hover:bg-surface"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-poppins text-sm text-primary truncate">
                              <FontAwesomeIcon
                                icon={section.icon}
                                className="mr-2 text-ink"
                              />
                              {conversationTitle(c, user.id)}
                            </span>
                            {c.unreadCount > 0 && (
                              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                                {c.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="font-poppins text-xs text-ink truncate">
                            {c.status === "archived"
                              ? "Archived"
                              : c.lastMessage
                              ? `${c.lastMessage.senderName}: ${c.lastMessage.text}`
                              : relativeTime(c.lastMessageAt)}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <LoadMore {...conversations} />
          </AsyncContent>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {selected ? (
          <>
            <div className="p-4 border-b border-line flex items-center justify-between">
              <div>
                <h2 className="font-poppins font-semibold text-primary">
                  {selected.type === "channel" && "# "}
                  {conversationTitle(selected, user.id)}
                </h2>
                <p className="font-poppins text-xs text-ink">
                  {selected.type === "channel"
                    ? selected.departmentId
                      ? "Department channel"
                      : "Facility-wide channel"
                    : Object.values(selected.participants)
                        .map((p) => `${p.name} (${labelFor(p.role)})`)
                        .join(", ")}
                </p>
              </div>
              {isAdmin &&
                selected.type === "channel" &&
                selected.status === "active" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={faArchive}
                    disabled={archive.busy}
                    onClick={() => archive.run(selected.id)}
                  >
                    Archive channel
                  </Button>
                )}
            </div>
            <ErrorMessage error={archive.error} className="m-4" />
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
      </div>

      {creating && (
        <NewConversation
          kind={creating}
          onClose={() => setCreating(null)}
          onCreated={(c) => {
            setCreating(null);
            conversations.reload();
            setParams({ c: c.id });
          }}
        />
      )}
    </div>
  );
}

export default TeamChat;

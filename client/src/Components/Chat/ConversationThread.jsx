import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, usePagedApi } from "../../hooks/useApi";
import { formatDateTime, labelFor } from "../../utils/format";
import AsyncContent, { ErrorMessage, LoadMore } from "../common/AsyncContent";
import { Button } from "../common/Button";

// v1 has no realtime messaging, so an open conversation is polled (docs/domain-model.md §2.14).
const POLL_MS = 15000;
const MAX_LENGTH = 4000;

// Messages of one conversation (newest page first, shown oldest at the top) with a composer.
// Opening it marks the conversation read; `onActivity` lets the list refresh its summary.
function ConversationThread({ conversation, onActivity }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const bottom = useRef(null);
  const messages = usePagedApi(
    (cursor) => api.listMessages(conversation.id, { cursor, limit: 50 }),
    [conversation.id]
  );

  // Poll the newest page and merge in anything not loaded yet.
  useEffect(() => {
    api.markConversationRead(conversation.id).catch(() => {});
    const timer = setInterval(async () => {
      try {
        const page = await api.listMessages(conversation.id, { limit: 50 });
        messages.setItems((items) => {
          const known = new Set(items.map((m) => m.id));
          const fresh = page.data.filter((m) => !known.has(m.id));
          return fresh.length ? [...fresh, ...items] : items;
        });
        api.markConversationRead(conversation.id).catch(() => {});
      } catch {
        // A failed poll is retried on the next tick.
      }
    }, POLL_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.id]);

  const newestId = messages.items[0]?.id;
  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "end" });
  }, [newestId]);

  const send = useAction(async () => {
    const message = await api.sendMessage(conversation.id, text.trim());
    messages.setItems((items) => [message, ...items]);
    setText("");
    onActivity?.();
  });

  const archived = conversation.status === "archived";
  const ordered = [...messages.items].reverse();

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <LoadMore {...messages} />
        <AsyncContent
          loading={messages.loading}
          error={messages.error}
          empty={ordered.length === 0}
          emptyText="No messages yet. Say hello."
        >
          {ordered.map((m) => {
            const mine = m.senderId === user.id;
            return (
              <div
                key={m.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    mine ? "bg-primary text-white" : "bg-surface text-ink"
                  }`}
                >
                  {!mine && (
                    <p className="font-poppins text-xs font-semibold mb-1">
                      {m.senderName} · {labelFor(m.senderRole)}
                    </p>
                  )}
                  <p className="font-poppins text-sm whitespace-pre-line">
                    {m.text}
                  </p>
                  <p
                    className={`font-poppins text-xs mt-1 ${
                      mine ? "text-white/75" : "text-ink-muted"
                    }`}
                  >
                    {formatDateTime(m.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </AsyncContent>
        <div ref={bottom} />
      </div>
      <form
        className="p-4 border-t border-line"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) send.run();
        }}
      >
        <ErrorMessage error={send.error} className="mb-2" />
        {archived ? (
          <p className="font-poppins text-sm text-ink">
            This conversation is archived.
          </p>
        ) : (
          <div className="flex items-center gap-4">
            <textarea
              rows={1}
              value={text}
              maxLength={MAX_LENGTH}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (text.trim()) send.run();
                }
              }}
              placeholder="Type your message…"
              aria-label="Message"
              className="flex-1 px-4 py-2 bg-surface rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <Button
              type="submit"
              icon={faPaperPlane}
              disabled={send.busy || !text.trim()}
            >
              Send
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

ConversationThread.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
  onActivity: PropTypes.func,
};

export default ConversationThread;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, usePagedApi } from "../../hooks/useApi";
import { pathForResource } from "../../utils/notifications";
import AsyncContent, { ErrorMessage, LoadMore } from "../common/AsyncContent";
import { PageShell } from "../common/PageShell";
import NotificationList from "./NotificationList";
import FilterSortControls from "./FilterSortControls";

function Notifications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  // The unread filter runs on the server; oldest-first only reorders the loaded pages.
  const notifications = usePagedApi(
    (cursor) =>
      api.listNotifications({
        unread: filter === "unread" ? true : undefined,
        cursor,
      }),
    [filter]
  );

  const markRead = useAction(async (id) => {
    await api.markNotificationRead(id);
    notifications.setItems((items) =>
      filter === "unread"
        ? items.filter((n) => n.id !== id)
        : items.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  });
  const markAll = useAction(async () => {
    await api.markAllNotificationsRead();
    notifications.reload();
  });

  const linkFor = (n) => pathForResource(n.resource, user.role);
  const open = async (n) => {
    if (!n.read) await markRead.run(n.id);
    navigate(linkFor(n));
  };

  const sorted =
    sort === "newest"
      ? notifications.items
      : [...notifications.items].reverse();

  return (
    <PageShell className="bg-gradient-to-br from-surface to-surface-tint">
      <div className="max-w-4xl mx-auto">
        <FilterSortControls
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          onMarkAllRead={() => markAll.run()}
        />
        <ErrorMessage
          error={markRead.error ?? markAll.error}
          className="mb-4"
        />
        <AsyncContent
          loading={notifications.loading}
          error={notifications.error}
          empty={sorted.length === 0}
          emptyText={
            filter === "unread" ? "You're all caught up." : "No notifications."
          }
        >
          <NotificationList
            notifications={sorted}
            handleMarkAsRead={(id) => markRead.run(id)}
            linkFor={linkFor}
            onOpen={open}
          />
          <LoadMore {...notifications} />
        </AsyncContent>
      </div>
    </PageShell>
  );
}

export default Notifications;

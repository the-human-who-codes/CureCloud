import { useState } from "react";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import AsyncContent from "../common/AsyncContent";
import NotificationList from "./NotificationList";
import FilterSortControls from "./FilterSortControls";

function Notifications() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const { data, error, loading, setData } = useApi(() =>
    api.listNotifications({ limit: 100 })
  );
  const notifications = data?.notifications ?? [];

  const handleMarkAsRead = async (id) => {
    await api.markNotificationRead(id);
    setData({
      notifications: notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    });
  };

  const filteredNotifications = notifications
    .filter((notification) => {
      if (filter === "read") return notification.read;
      if (filter === "unread") return !notification.read;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f8faff] to-[#e6eaff]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <FilterSortControls
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
            />
            <AsyncContent
              loading={loading}
              error={error}
              empty={filteredNotifications.length === 0}
              emptyText="No notifications."
            >
              <NotificationList
                notifications={filteredNotifications}
                handleMarkAsRead={handleMarkAsRead}
              />
            </AsyncContent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;

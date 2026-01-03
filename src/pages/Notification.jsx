import { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import apiClient from "../services/api-client";

const Notification = ({ userId }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Load notifications & mark seen based on localStorage
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await apiClient.get("/notification");
        let data = res.data.results;

        // Get notifications already seen by this user from localStorage
        const seenNotifications = JSON.parse(
          localStorage.getItem(`seenNotifications_${userId}`) || "[]"
        );

        // Mark as read if already seen
        data = data.map(n => ({
          ...n,
          read: seenNotifications.includes(n.id),
        }));

        setNotifications(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotification();
  }, [userId]);

  // Toggle dropdown
  const toggleNotifications = () => {
    if (notifications.length === 0) return;
    setIsNotificationOpen(prev => !prev);
  };

  // Mark all as read + persist
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    // Save seen notifications in localStorage
    const seenIds = notifications.map(n => n.id);
    localStorage.setItem(
      `seenNotifications_${userId}`,
      JSON.stringify(seenIds)
    );

    setIsNotificationOpen(false);
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
      >
        <IoNotificationsOutline className="text-2xl text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isNotificationOpen && (
        <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 font-semibold border-b text-gray-700 text-lg">
            Notifications
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm text-center">
                No notifications
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b last:border-none rounded-lg ${
                    !n.read ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
                  } transition`}
                >
                  <p className={`text-sm ${!n.read ? "font-medium text-gray-900" : "text-gray-700"}`}>
                    {n.message}
                  </p>
                  <span className="text-xs text-gray-500">{n.created_at}</span>
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="w-full text-center cursor-pointer py-2 text-sm text-blue-700 hover:bg-gray-50 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;

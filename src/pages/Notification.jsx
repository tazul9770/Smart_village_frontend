import { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import apiClient from "../services/api-client";

const Notification = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await apiClient.get("/notification");
        setNotifications(res.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotification();
  }, []);

  const toggleNotifications = () => {
    if (notifications.length === 0) return;
    setIsNotificationOpen(prev => !prev);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
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
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isNotificationOpen && (
        <div className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 font-semibold border-b">Notifications</div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map(n => (
              <div
                key={n.id}
                className="px-4 py-3 hover:bg-gray-100 border-b last:border-none"
              >
                <p className="text-sm text-gray-800">{n.message}</p>
                <span className="text-xs text-gray-500">{n.created_at}</span>
              </div>
            ))}
          </div>
          <button
            onClick={markAllAsRead}
            className="w-full text-center py-2 text-sm text-green-700 hover:bg-gray-50"
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;

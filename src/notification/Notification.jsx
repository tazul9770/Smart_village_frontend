import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Fetch notifications
    useEffect(() => {
        const fetchNotification = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get(
                    `/notification/?page=${currentPage}`
                );

                setNotifications(res.data.results || []);
                setNextPageUrl(res.data.next);
                setPrevPageUrl(res.data.previous);
            } catch (err) {
                console.log(err);
                setErrorMsg("Failed to load notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchNotification();
    }, [currentPage]);

    // Delete notification
        const deleteNotification = async (id) => {
            try {
                setSuccessMsg("");
                setErrorMsg("");
                const storedTokens = localStorage.getItem("authTokens");
                const accessToken = storedTokens ? JSON.parse(storedTokens).access : null;
                await apiClient.delete(`/notification/${id}/`, {
                    headers: {Authorization: `JWT ${accessToken}`,},
                });
                setNotifications((prev) => prev.filter((item) => item.id !== id));
                setSuccessMsg("Notification deleted successfully");
                setTimeout(() => {setSuccessMsg("")}, 3000);
            } catch (err) {
                setErrorMsg(err)
                setTimeout(() => {setErrorMsg("")}, 3000);
            }
        };
    return (
        <section className="max-w-6xl mx-auto mt-8 px-4">
            <div className="bg-white shadow-xl rounded-xl p-6">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    🔔 Notifications
                </h1>

                {successMsg && (
                    <p className="text-green-600 text-center font-semibold mb-2">
                        {successMsg}
                    </p>
                )}

                {errorMsg && (
                    <p className="text-red-600 text-center font-semibold mb-2">
                        {errorMsg}
                    </p>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <span className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                    </div>
                ) : notifications.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">
                        No notifications found
                    </p>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="text-left px-4 py-3">
                                            Message
                                        </th>
                                        <th className="text-left px-4 py-3">
                                            Date
                                        </th>
                                        <th className="text-center px-4 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notifications.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3">
                                                {item.message}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {new Date(
                                                    item.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() =>
                                                        deleteNotification(
                                                            item.id
                                                        )
                                                    }
                                                    className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className="border rounded-lg p-4 shadow-sm"
                                >
                                    <p className="font-medium text-gray-800 mb-2">
                                        {item.message}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-3">
                                        {new Date(
                                            item.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() =>
                                            deleteNotification(item.id)
                                        }
                                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-10 gap-6 items-center">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => prev - 1)
                        }
                        disabled={!prevPageUrl}
                        className="px-6 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
                    >
                        ← Prev
                    </button>

                    <span className="font-semibold text-gray-700">
                        Page {currentPage}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((prev) => prev + 1)
                        }
                        disabled={!nextPageUrl}
                        className="px-6 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Notification;

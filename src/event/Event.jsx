import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import useAuthContext from "../hooks/useAuthContext";
import EventCard from "./EventCard";

const Event = () => {
  const { user } = useAuthContext();
  const email = user?.email;

  const [events, setEvents] = useState([]);
  const [successMsg, setSuccessMsg] = useState({}); // key: eventId
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch events
  const fetchEvents = async (page = currentPage, search = searchQuery) => {
    try {
      setLoading(true);
      let url = `/events/?page=${page}`;
      if (search) url += `&search=${search}`;

      const res = await apiClient.get(url);
      setEvents(res.data.results || []);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  // Join/Leave event
  const joinLeaveEvent = async (eventId, action) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("authTokens") || "{}");
      if (!authToken?.access) return;

      // Optimistic UI
      setEvents((prev) =>
        prev.map((evt) => {
          if (evt.id === eventId) {
            const updatedParticipants =
              action === "join"
                ? [...(evt.participant || []), email]
                : (evt.participant || []).filter((p) => p !== email);
            return { ...evt, participant: updatedParticipants };
          }
          return evt;
        })
      );

      setSuccessMsg((prev) => ({
        ...prev,
        [eventId]: action === "join" ? "Joined successfully!" : "Left the event",
      }));

      setTimeout(() => {
        setSuccessMsg((prev) => ({ ...prev, [eventId]: null }));
      }, 2500);

      await apiClient.post(
        `/events/${eventId}/${action}/`,
        {},
        { headers: { Authorization: `JWT ${authToken.access}` } }
      );
    } catch (err) {
      console.error("Join/Leave error:", err);
      fetchEvents(currentPage, searchQuery);
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("authTokens") || "{}");
      if (!authToken?.access) return;

      await apiClient.delete(`/events/${eventId}/`, {
        headers: { Authorization: `JWT ${authToken.access}` },
      });

      setEvents((prev) => prev.filter((evt) => evt.id !== eventId));
      setSuccessMsg((prev) => ({ ...prev, [eventId]: "Event deleted successfully!" }));

      setTimeout(() => {
        setSuccessMsg((prev) => ({ ...prev, [eventId]: null }));
      }, 2500);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Search
  const handleSearch = () => {
    setCurrentPage(1);
    setSearchQuery(searchInput);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-900">
          All Events
        </h1>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12 flex flex-col sm:flex-row gap-3 sm:gap-2">
          <input
            type="text"
            placeholder="Search events..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          />
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto px-5 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {/* Loading / Empty */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg font-medium text-gray-700 animate-pulse">
              Loading events...
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg font-medium text-gray-500">No events found.</p>
          </div>
        ) : (
          <>
            {/* Event Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  email={email}
                  onJoinLeave={joinLeaveEvent}
                  onDelete={deleteEvent}
                  successMsg={successMsg[event.id]} // Only for this card
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-4 items-center">
              <button
                onClick={() => prevPageUrl && setCurrentPage((prev) => prev - 1)}
                disabled={!prevPageUrl}
                className="px-5 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Prev
              </button>

              <span className="px-4 py-2 font-semibold text-gray-700">
                Page {currentPage}
              </span>

              <button
                onClick={() => nextPageUrl && setCurrentPage((prev) => prev + 1)}
                disabled={!nextPageUrl}
                className="px-5 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Event;

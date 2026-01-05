import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom"; // For navigation

const EventCard = ({ event, email, onJoinLeave, successMsg, onDelete }) => {
  const joined = event.participant?.includes(email);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleJoinLeave = () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }
    onJoinLeave(event.id, joined ? "leave" : "join");
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-200">
      
      {/* Card-level success message */}
      {successMsg && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg z-20 animate-fade-in-out">
          {successMsg}
        </div>
      )}

      {/* Event Image */}
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div className="h-52 flex items-center justify-center bg-gray-100 text-gray-400 font-semibold text-lg">
          No Image
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
          {event.title}
        </h2>

        {/* Category / Location / Organizer */}
        <div className="text-sm text-gray-500 mb-4 space-y-1">
          <p><span className="font-semibold">Category:</span> {event.category}</p>
          <p><span className="font-semibold">Location:</span> {event.location}</p>
          <p><span className="font-semibold">Organizer:</span> {event.organizer}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>

        {/* Participants */}
        <div className="mb-4">
          <p className="text-xs font-semibold mb-2">Participants ({event.participant?.length || 0})</p>
          {event.participant?.length > 0 ? (
            <div className="max-h-28 overflow-y-auto flex flex-wrap gap-2">
              {event.participant.map((p) => (
                <span
                  key={p}
                  title={p}
                  className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full whitespace-nowrap shadow-sm"
                >
                  {p.length > 15 ? p.slice(0, 12) + "..." : p}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-gray-400">No participants yet</span>
          )}
        </div>

        {/* Join / Leave Button */}
        <button
          onClick={handleJoinLeave}
          className={`mt-auto w-full py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
            joined
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {joined ? "Leave Event" : "Join Event"}
        </button>

        {/* Delete Button (staff) */}
        {user?.is_staff && (
          <button
            onClick={() => onDelete(event.id)}
            className="mt-3 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl shadow-md transition-all duration-300"
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;

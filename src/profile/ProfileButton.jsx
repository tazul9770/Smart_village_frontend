import React from "react";

const ProfileButton = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="flex justify-end mt-6">
      {isEditing ? (
        <div className="flex space-x-3">
          {/* Save Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 cursor-pointer rounded-lg text-white font-medium shadow-md transition duration-200
              ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 cursor-pointer rounded-lg bg-gray-200 text-gray-800 font-medium shadow-md hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 cursor-pointer rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition duration-200"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButton;

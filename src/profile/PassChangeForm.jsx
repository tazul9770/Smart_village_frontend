import { useState } from "react";
import { Link } from "react-router";

const PassChangeForm = ({ register, errors, watch, isEditing }) => {
  const [passSecOpen, setPassSecOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <section className="mt-8">
      
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setPassSecOpen(!passSecOpen)}
        className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:underline"
      >
        {passSecOpen ? "Hide Password Settings" : "Change Password"}
      </button>

      {passSecOpen && (
        <div className="mt-5 bg-white rounded-xl border shadow-sm p-6 space-y-5">

          {/* Section Header */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Password Settings
            </h3>
            <p className="text-sm text-gray-500">
              Update your account password securely
            </p>
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              disabled={!isEditing}
              className={`w-full rounded-lg border px-4 py-2 text-sm transition
                ${isEditing
                  ? "bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  : "bg-gray-100 cursor-not-allowed"}
              `}
              {...register("current_password", {
                required: "Current password is required",
              })}
            />
            {errors.current_password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.current_password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              disabled={!isEditing}
              className={`w-full rounded-lg border px-4 py-2 text-sm transition
                ${isEditing
                  ? "bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  : "bg-gray-100 cursor-not-allowed"}
              `}
              {...register("new_password", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.new_password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.new_password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              disabled={!isEditing}
              className={`w-full rounded-lg border px-4 py-2 text-sm transition
                ${isEditing
                  ? "bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  : "bg-gray-100 cursor-not-allowed"}
              `}
              {...register("confirm_new_password", {
                validate: (value) =>
                  value === watch("new_password") ||
                  "Passwords do not match",
              })}
            />
            {errors.confirm_new_password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirm_new_password.message}
              </p>
            )}
          </div>

          {/* Actions */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">

              {/* Show Password */}
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPass}
                  onChange={() => setShowPass(!showPass)}
                />
                Show password
              </label>

              {/* Forgot Password */}
              <Link
                to="forgot_password"
                className="text-sm text-indigo-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default PassChangeForm;

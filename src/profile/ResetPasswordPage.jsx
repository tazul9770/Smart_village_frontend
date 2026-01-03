// src/components/ResetPasswordPage.js
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import apiClient from "../services/api-client";

const ResetPasswordPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: data.new_password,
      });
      setMessage("Password reset successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setError("Invalid or expired token.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Set a New Password
        </h2>

        {/* Success / Error Alerts */}
        {message && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-4 text-center font-medium">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-4 text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        {!message && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                {...register("new_password", { required: "Password is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ${
                  errors.new_password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.new_password && (
                <p className="text-sm text-red-500 mt-1">{errors.new_password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                {...register("confirm_password", {
                  required: "Please confirm password",
                  validate: (val) => val === watch("new_password") || "Passwords do not match",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ${
                  errors.confirm_password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirm_password && (
                <p className="text-sm text-red-500 mt-1">{errors.confirm_password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Optional Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Remember your password?{" "}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

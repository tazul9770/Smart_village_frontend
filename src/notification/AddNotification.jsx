import { useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";

const AddNotification = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const handleAdd = async (data) => {
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const token = JSON.parse(localStorage.getItem("authTokens"));
      await apiClient.post("/notification/",data,
        {headers: {Authorization: `JWT ${token?.access}`,},}
      );
      setSuccessMsg("Notification added successfully!");
      reset(); // Reset form fields
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || "Failed to add notification."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-3xl shadow-xl mt-10 transition-all duration-300">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-900">
        Add Notification
      </h1>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 text-green-700 font-semibold text-center bg-green-100 p-4 rounded-2xl shadow-sm">
          {successMsg}
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="mb-6 text-red-700 font-semibold text-center bg-red-100 p-4 rounded-2xl shadow-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(handleAdd)} className="space-y-6">
        {/* Message Field */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Message
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Write message here"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition resize-none"
            rows={5}
          />
          {errors.message && (
            <p className="text-red-500 mt-1 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Adding notification..." : "Add Notification"}
        </button>
      </form>
    </div>
  );
};

export default AddNotification;

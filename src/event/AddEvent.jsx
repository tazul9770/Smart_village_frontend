import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { useState } from "react";

const AddEvent = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const tokenObj = JSON.parse(localStorage.getItem("authTokens") || "{}");

  const onSubmit = async (data) => {
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("category", data.category);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await apiClient.post("/events/", formData, {
        headers: {
          Authorization: `JWT ${tokenObj.access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMsg("Event created successfully.");
      reset(); // clear form after success
    } catch (err) {
      setErrorMsg(err?.response?.data?.detail || "Failed to create event");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-3xl shadow-xl mt-10 transition-all duration-300">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-900">
        Add New Event
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter event title"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter event description"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Image</label>
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 cursor-pointer shadow-sm transition"
          />
          <p className="text-gray-500 text-sm mt-1">Optional. Upload an image for the event.</p>
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            type="text"
            placeholder="Enter event location"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          />
          {errors.location && (
            <p className="text-red-500 mt-1 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          >
            <option value="">Select a category</option>
            <option value="cultural">Cultural Event</option>
            <option value="sports">Sports Event</option>
            <option value="religious">Religious Event</option>
            <option value="education">Educational Program</option>
            <option value="health">Health Camp</option>
            <option value="festival">Village Festival</option>
            <option value="meeting">Public Meeting</option>
            <option value="training">Training Workshop</option>
            <option value="youth">Youth Program</option>
            <option value="awareness">Awareness Campaign</option>
          </select>
          {errors.category && (
            <p className="text-red-500 mt-1 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Adding Event..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;

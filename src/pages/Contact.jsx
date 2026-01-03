import { useForm } from "react-hook-form";
import { useState } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineChat } from 'react-icons/hi';
import apiClient from "../services/api-client";

const Contact = () => {
  const [message, setMessage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("/contact/", data);
      if (response.status === 200 || response.status === 201) {
        setMessage("Your message has been sent successfully");
        setTimeout(() => setMessage(null), 5000);
        reset();
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-green-50 via-emerald-100 to-cyan-50 py-20 px-6 md:px-20">
      {/* Decorative Glow Background */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-cyan-400/20 via-green-200/10 to-blue-400/20 blur-3xl pointer-events-none"></div>

      {/* Form Card */}
      <div className="relative max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-green-200">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          Contact with us
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Have questions or feedback? Send a message — We will reply soon.
        </p>

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 text-center py-3 rounded-xl shadow-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <HiOutlineMail className="absolute top-1/2 left-3 -translate-y-1/2 text-green-600 w-5 h-5" />
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className={`w-full border rounded-xl p-3 pl-10 bg-green-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.email ? "border-red-500" : "border-green-200"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="relative">
            <HiOutlinePhone className="absolute top-1/2 left-3 -translate-y-1/2 text-green-600 w-5 h-5" />
            <input
              type="text"
              {...register("phone_number", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Phone number must be exactly 11 digits",
                },
              })}
              placeholder="01xxxxxxxxx"
              maxLength={11}
              className={`w-full border rounded-xl p-3 pl-10 bg-green-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.phone_number ? "border-red-500" : "border-green-200"
              }`}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.phone_number.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="relative">
            <HiOutlineChat className="absolute top-3 left-3 text-green-600 w-5 h-5" />
            <textarea
              rows={5}
              {...register("comment", { required: "Message is required" })}
              placeholder="Write your comment here..."
              className={`w-full border rounded-xl p-3 pt-8 pl-10 bg-green-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.comment ? "border-red-500" : "border-green-200"
              }`}
            />
            {errors.comment && <p className="text-red-500 text-sm mt-1 ml-1">{errors.comment.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center transition disabled:opacity-50 mt-4 shadow-lg"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

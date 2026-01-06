import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";

const AddProfessionUser = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasProfile, setHasProfile] = useState(false); // Track if user already has a profile

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const token = JSON.parse(localStorage.getItem("authTokens"));

  // Check if profile exists on component mount
  useEffect(() => {
    const checkProfile = async () => {
      if (!token?.access) return;
      try {
        const res = await apiClient.get("/profession_user/", {
          headers: { Authorization: `JWT ${token.access}` },
        });

        if (res.data) {
          setHasProfile(true);
          setErrorMsg("You already have a profile.");
        }
      } catch (err) {
        // 404 = profile not found → user can create
        if (err.response?.status !== 404) {
          console.error(err);
        }
      }
    };

    checkProfile();
  }, [token]);

  const handleAdd = async (data) => {
    setSuccessMsg("");
    setErrorMsg("");

    if (!token?.access) {
      setErrorMsg("You must be logged in to create a profile");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("age", data.age);
      formData.append("description", data.description);
      formData.append("profession", data.profession);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await apiClient.post("/profession_user/", formData, {
        headers: {
          Authorization: `JWT ${token.access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMsg("Your profession user profile created successfully.");
      setHasProfile(true); // Disable button after creation
      reset();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);

      const data = err.response?.data;

      // Handle backend errors gracefully
      if (data?.non_field_errors) {
        setErrorMsg(data.non_field_errors.join(" "));
      } else if (data) {
        const fieldMessages = Object.values(data).flat().join(" ");
        setErrorMsg(fieldMessages || "You already have a profile.");
      } else {
        setErrorMsg(err.message || "Failed to create profile");
      }

      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-3xl shadow-xl mt-10 transition-all duration-300">
      <h1 className="text-3xl md:text-4xl sm:text-2xl font-extrabold mb-8 text-center text-gray-900">
        Create Profession User Profile
      </h1>

      <p className="text-sm text-center text-gray-700 mb-4">
        We already have some information from you.
      </p>

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
        {/* Age */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Age</label>
          <input
            {...register("age", { required: "Age is required" })}
            type="number"
            placeholder="Enter your age"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          />
          {errors.age && (
            <p className="text-red-500 mt-1 text-sm">{errors.age.message}</p>
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
          <p className="text-gray-500 text-sm mt-1">
            Optional. Upload an image for your profile.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter your description"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Profession */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Profession</label>
          <select
            {...register("profession", { required: "Profession is required" })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          >
            <option value="">Select a category</option>
            <option value="bussinessman">Bussinessman</option>
            <option value="software_engineer">Software Engineer</option>
            <option value="software_developer">Software Developer</option>
            <option value="freelancer">Freelancer</option>
            <option value="teacher">Teacher</option>
            <option value="doctor">Doctor</option>
            <option value="student">Student</option>
            <option value="nurse">Nurse</option>
            <option value="farmer">Farmer</option>
            <option value="mechanic">Mechanic</option>
            <option value="designer">Designer</option>
            <option value="data_scientist">Data Scientist</option>
            <option value="defense">Defense</option>
            <option value="lawyer">Lawyer</option>
            <option value="accountant">Accountant</option>
            <option value="artist">Artist</option>
            <option value="chef">Chef</option>
            <option value="photographer">Photographer</option>
            <option value="journalist">Journalist</option>
            <option value="driver">Driver</option>
            <option value="pilot">Pilot</option>
            <option value="engineer">Engineer</option>
          </select>
          {errors.profession && (
            <p className="text-red-500 mt-1 text-sm">{errors.profession.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || hasProfile} // disable if user already has a profile
          className={`w-full py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer ${
            isSubmitting || hasProfile
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {hasProfile
            ? "Profile Already Created"
            : isSubmitting
            ? "Adding Profile..."
            : "Add Profile"}
        </button>
      </form>
    </div>
  );
};

export default AddProfessionUser;

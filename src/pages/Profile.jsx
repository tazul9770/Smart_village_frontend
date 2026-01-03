import { useForm } from "react-hook-form";
import ProfileForm from "../profile/ProfileForm";
import { useEffect, useState } from "react";
import ProfileButton from "../profile/ProfileButton";
import PassChangeForm from "../profile/PassChangeForm";
import useAuthContext from "../hooks/useAuthContext";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile, successMsg, errorMsg, changePassword } =
    useAuthContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const profilePayLoad = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };

      await updateUserProfile(profilePayLoad);

      if (data.current_password && data.new_password) {
        changePassword({
          new_password: data.new_password,
          current_password: data.current_password,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Messages */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md mb-4 text-center font-medium">
            {successMsg}
          </div>
        )}

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Profile Information
          </h1>
          <p className="text-gray-500 mt-1">
            View and update your personal details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Info Section */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Personal Details
            </h2>
            <ProfileForm
              register={register}
              errors={errors}
              isEditing={isEditing}
            />
          </div>

          {/* Password Change Section */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Change Password
            </h2>
            <PassChangeForm
              register={register}
              errors={errors}
              watch={watch}
              isEditing={isEditing}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <ProfileButton
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

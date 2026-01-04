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
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Profile
          </h1>
          <p className="mt-2 text-gray-500 max-w-xl mx-auto">
            Manage your personal information and security settings
          </p>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-center text-green-700 font-medium">
            {successMsg}
          </div>
        )}

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="divide-y">
            
            {/* Profile Section */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Personal Information
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Update your basic profile details
              </p>

              <ProfileForm
                register={register}
                errors={errors}
                isEditing={isEditing}
              />
            </div>

            {/* Password Section */}
            <div className="p-6 sm:p-8 bg-gray-50/60">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Security
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Change your account password
              </p>

              <PassChangeForm
                register={register}
                errors={errors}
                watch={watch}
                isEditing={isEditing}
              />
            </div>

            {/* Actions */}
            <div className="p-6 sm:p-8 flex justify-end bg-white">
              <ProfileButton
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isSubmitting={isSubmitting}
              />
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;

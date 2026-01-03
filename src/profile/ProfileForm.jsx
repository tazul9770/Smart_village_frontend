const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Personal Information
        </h2>
        <p className="text-sm text-gray-500">
          Update your personal details below
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            disabled={!isEditing}
            className={`w-full rounded-lg border px-4 py-2 text-sm transition
              ${isEditing
                ? "bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                : "bg-gray-100 cursor-not-allowed"}
            `}
            {...register("first_name", {
              required: "First name is required",
            })}
          />
          {errors.first_name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.first_name.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            disabled={!isEditing}
            className={`w-full rounded-lg border px-4 py-2 text-sm transition
              ${isEditing
                ? "bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                : "bg-gray-100 cursor-not-allowed"}
            `}
            {...register("last_name")}
          />
        </div>

        {/* Email (Readonly) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            disabled
            className="w-full rounded-lg border px-4 py-2 text-sm bg-gray-100 cursor-not-allowed opacity-80"
            {...register("email")}
          />
          <p className="mt-1 text-xs text-gray-400">
            Email address cannot be changed
          </p>
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="House, Road, City"
            disabled={!isEditing}
            className={`w-full rounded-lg border px-4 py-2 text-sm transition
              ${isEditing
                ? "bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                : "bg-gray-100 cursor-not-allowed"}
            `}
            {...register("address")}
          />
        </div>

        {/* Phone Number */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+8801XXXXXXXXX"
            disabled={!isEditing}
            className={`w-full rounded-lg border px-4 py-2 text-sm transition
              ${isEditing
                ? "bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                : "bg-gray-100 cursor-not-allowed"}
            `}
            {...register("phone_number")}
          />
        </div>
      </div>

      {/* Editing Hint */}
      {!isEditing && (
        <p className="mt-4 text-xs text-gray-400 italic">
          Click “Edit Profile” to update your information
        </p>
      )}
    </section>
  );
};

export default ProfileForm;

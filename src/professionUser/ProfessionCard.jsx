const ProfessionCard = ({users}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {users.map((user) => (
      <div
        key={user.id}
        className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 p-4 sm:p-5"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={user.image}
              alt={user.first_name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-indigo-500 w-3 h-3 rounded-full border-2 border-white animate-pulse"></span>
          </div>

          <div className="flex flex-col justify-center gap-1 text-center sm:text-left">
            {/* Name */}
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">
              Name
            </p>
            <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-0.5">
              {user.first_name}
            </h2>

            {/* Profession */}
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">
              Profession
            </p>
            <p className="text-sm text-gray-700 font-semibold flex items-center justify-center sm:justify-start gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z"
                />
              </svg>
              {user.profession}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
          <div className="bg-indigo-50 rounded-2xl p-3 text-center hover:bg-indigo-100 transition-colors">
            <p className="text-indigo-400 uppercase tracking-wider">Age</p>
            <p className="font-bold text-gray-900 mt-1">{user.age} yrs</p>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-3 text-center hover:bg-indigo-100 transition-colors">
            <p className="text-indigo-400 uppercase tracking-wider">Phone</p>
            <p className="font-bold text-gray-900 mt-1">{user.phone_number}</p>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-3 col-span-1 sm:col-span-2 break-all hover:bg-indigo-100 transition-colors">
            <p className="text-indigo-400 uppercase tracking-wider">Email</p>
            <p className="font-medium text-gray-900 mt-1 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-indigo-50 rounded-2xl p-3 hover:bg-indigo-100 transition-colors">
          <p className="text-indigo-400 uppercase tracking-wide mb-1 text-[10px]">
            Description
          </p>
          <p className="text-gray-700 text-sm leading-snug line-clamp-4">
            {user.description}
          </p>
        </div>
      </div>
    ))}
  </div>
    );
};

export default ProfessionCard;
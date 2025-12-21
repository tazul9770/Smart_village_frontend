import { FaTractor, FaBolt, FaBook, FaHospital, FaLaptopCode } from "react-icons/fa6";

const VillageHighlights = () => {
  const highlights = [
    {
      icon: FaTractor,
      title: "Modern Farming",
      description: "Introducing smart machinery and optimized crop techniques for better yield.",
      color: "bg-green-500",
    },
    {
      icon: FaBolt,
      title: "Renewable Energy",
      description: "Solar panels and sustainable energy solutions for every household.",
      color: "bg-yellow-400",
    },
    {
      icon: FaBook,
      title: "Education Initiatives",
      description: "Digital classrooms and training programs to empower students and teachers.",
      color: "bg-blue-500",
    },
    {
      icon: FaHospital,
      title: "Healthcare Access",
      description: "Mobile clinics and telemedicine services for village communities.",
      color: "bg-red-500",
    },
    {
      icon: FaLaptopCode,
      title: "Digital Tools",
      description: "Village apps and smart systems to connect and monitor progress.",
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-green-50 via-cyan-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Staggered Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative p-8 rounded-3xl shadow-2xl transform hover:-translate-y-3 transition-all duration-500 bg-white"
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-full ${item.color} text-white text-3xl mb-6`}>
                  <Icon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VillageHighlights;

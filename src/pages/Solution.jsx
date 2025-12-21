import { GiPlantSeed } from "react-icons/gi";
import { MdOutlineSolarPower } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi2";

const Solutions = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-cyan-50 py-32">

      {/* Decorative Blobs (same style as Hero) */}
      <div className="absolute -top-32 -right-40 w-[30rem] h-[30rem] bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-cyan-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-20">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            🌱 What We Do
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Smart Solutions for
            <span className="block text-green-600">Rural Communities</span>
          </h2>

          <p className="text-gray-700 text-lg md:text-xl">
            Sustainable technologies designed to uplift villages
            through innovation, energy, and digital growth.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-xl transition">
            <GiPlantSeed className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Smart Agriculture
            </h3>
            <p className="text-gray-600">
              Intelligent farming solutions that boost yield and reduce waste.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-xl transition">
            <MdOutlineSolarPower className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Clean Energy
            </h3>
            <p className="text-gray-600">
              Solar and renewable energy powering sustainable villages.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-xl transition">
            <FaPeopleRoof className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Community Growth
            </h3>
            <p className="text-gray-600">
              Strengthening education, healthcare, and local infrastructure.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-xl transition">
            <HiOutlineLightBulb className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Digital Innovation
            </h3>
            <p className="text-gray-600">
              Smart digital tools connecting villages to the modern world.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Solutions;

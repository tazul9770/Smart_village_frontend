import { Link } from "react-router-dom";
import heroImage from "../assets/village.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-cyan-50">
      
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-cyan-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-20 py-32 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* Right Image (Shown FIRST on mobile) */}
        <div className="relative flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
            <img
              src={heroImage}
              alt="Smart Village"
              className="w-full  rounded-3xl shadow-2xl object-cover"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Left Content (Shown AFTER image on mobile) */}
        <div className="text-center md:text-left order-2 md:order-1">
          
          {/* Badge */}
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            🌍 Empowering Rural Innovation
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Building the Future of  
            <span className="block text-green-600">Smart Villages</span>
          </h1>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mb-10">
            SmartVillage delivers modern technology for rural communities — 
            from intelligent farming and renewable energy to digital empowerment.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              "🌱 Smart Agriculture",
              "⚡ Clean Energy",
              "🏘 Community Development",
              "💡 Digital Innovation",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm"
              >
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/solutions"
              className="px-7 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transition"
            >
              Explore Solutions →
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 rounded-xl border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

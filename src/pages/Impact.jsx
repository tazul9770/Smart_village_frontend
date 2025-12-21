const Impact = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-cyan-50 py-32">

      {/* Decorative Blobs (same style) */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-cyan-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-20">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            🌍 Our Impact
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Transforming Lives in
            <span className="block text-green-600"> Rural Communities</span>
          </h2>

          <p className="text-gray-700 text-lg md:text-xl">
            SmartVillage is creating real change by empowering villages
            with technology, sustainability, and opportunity.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition">
            <h3 className="text-4xl font-extrabold text-green-600 mb-2">50+</h3>
            <p className="text-gray-800 font-medium">Villages Reached</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition">
            <h3 className="text-4xl font-extrabold text-green-600 mb-2">10K+</h3>
            <p className="text-gray-800 font-medium">Lives Impacted</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition">
            <h3 className="text-4xl font-extrabold text-green-600 mb-2">30%</h3>
            <p className="text-gray-800 font-medium">Energy Savings</p>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition">
            <h3 className="text-4xl font-extrabold text-green-600 mb-2">24/7</h3>
            <p className="text-gray-800 font-medium">Smart Monitoring</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Impact;

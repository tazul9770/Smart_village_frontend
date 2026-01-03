import { useEffect, useState } from "react";
import {
  FiUsers,
  FiHome,
  FiMapPin,
  FiBookOpen,
  FiCalendar,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";
import apiClient from "../services/api-client";

const VillageDetails = () => {
    const [village, setVillage] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVillage = async() => {
          try{
            const res = await apiClient.get('/village')
            setVillage(res.data.results);
          }catch(err) {
            setError("Failed to load village data")
          }finally{
            setLoading(false)
          }
        }
        fetchVillage()
    }, [])

    if (loading) {
      return <p className="text-center text-gray-800 font-semibold m-15">Loading village data...</p>;
    }

    if (error) {
      return <p className="text-center text-red-600 mt-20">{error}</p>;
    }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-cyan-50">
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-green-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-cyan-400/20 rounded-full blur-3xl" />
      {village.map(v => (
      <div key={v.id}>
        {/* HERO */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-20 pt-28 pb-20 grid md:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={v.image}
              alt="Nilakhia Village"
              className="w-full max-w-2xl rounded-3xl shadow-2xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
              🌾 {v.name} Profile
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              {village.name}
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {v.description}
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm text-sm font-medium">
                <FiCalendar className="text-green-600" /> Established year: {v.established_year}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm text-sm font-medium">
                <FiMapPin className="text-green-600" /> Post code: {v.post_code}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm text-sm font-medium">
                <FiUser className="text-green-600" />Head of village:{v.head_of_village}
              </div>
            </div>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-20 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {icon: <FiUsers />,label: "Population",value: v.population,},
              {icon: <FiHome />,label: "Houses",value: v.number_of_houses,},
              {icon: <FiBookOpen />,label: "Literacy Rate",value: `${v.literacy_rate}%`,},
              {icon: <FiMapPin />,label: "Area",value: `${v.area_sq_km} sq km`,},
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="text-green-600 text-xl mb-2 flex justify-center">
                  {item.icon}
                </div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-xl font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-20 pb-24">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Civic */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
              <h3 className="text-lg font-bold mb-6">Civic Information</h3>
              <div className="flex justify-between py-2 border-b">
                <span>Total Voters</span>
                <span className="font-semibold">{v.total_voters}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Community Centers</span>
                <span className="font-semibold">{v.number_of_community_centers}</span>
              </div>
            </div>

            {/* Education & Economy */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
              <h3 className="text-lg font-bold mb-6">Education & Economy</h3>
              <div className="flex justify-between py-2 border-b">
                <span>Schools</span>
                <span className="font-semibold">{v.number_of_schools}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Markets</span>
                <span className="font-semibold">{v.number_of_markets}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Religious Places</span>
                <span className="font-semibold">{v.number_of_religious_places}</span>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
              <h3 className="text-lg font-bold mb-6">Basic Facilities</h3>
              {["Electricity", "Clean Water", "Internet"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <FiCheckCircle className="text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      ))}

    </section>
  );
};

export default VillageDetails;

import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import Pagination from "./Pagination";
import ProfessionCard from "./ProfessionCard";

const ProfessionUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("authTokens"));

  const fetchProfessionUsers = async () => {
    try {
      setLoading(true);
      let url = `/profession_user/?page=${currentPage}`;
      if (searchQuery) url += `&search=${searchQuery}`;

      const res = await apiClient.get(url, {
        headers: { Authorization: `JWT ${token?.access}` },
      });

      setUsers(res.data.results);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionUsers();
  }, [currentPage, searchQuery]);

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchQuery(searchInput);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search */}
      <div className="max-w-md mx-auto mb-10 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search your name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-xl font-semibold text-gray-600">
          Loading users...
        </div>
      )}

      {/* Users Grid */}
      {!loading && users.length > 0 && (
        <ProfessionCard users={users}/>
      )}


      {/* No users found */}
      {!loading && users.length === 0 && (
        <div className="text-center py-20 text-lg text-gray-500">
          No professionals found.
        </div>
      )}

      {/* Pagination */}
      {!loading && users.length > 0 && (
        <div className="mt-10">
          <Pagination
            prevPageUrl={prevPageUrl}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            nextPageUrl={nextPageUrl}
          />
        </div>
      )}
    </div>
  );
};

export default ProfessionUser;

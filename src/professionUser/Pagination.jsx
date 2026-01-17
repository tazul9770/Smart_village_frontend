const Pagination = ({prevPageUrl, setCurrentPage, currentPage, nextPageUrl}) => {
    return (
        <div className="flex justify-center mt-12 gap-4 items-center">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={!prevPageUrl}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold text-gray-700">
            Page {currentPage}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={!nextPageUrl}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
    );
};

export default Pagination;
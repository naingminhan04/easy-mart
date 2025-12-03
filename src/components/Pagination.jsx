import { useState, useEffect } from "react";

export default function Pagination({
  page,
  setSearchParams,
  totalPages,
}) {
  const [pageNum, setPageNum] = useState(page);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setPageNum(page);
  }, [page]);

  if (totalPages > 1) {
    return (
      <div className="flex justify-center items-center gap-2 p-2">
        <button
          disabled={page === 1}
          onClick={() => {
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("page", page - 1);
              return params;
            });
            scrollToTop();
          }}
          className="px-4 py-2 w-15 justify-center flex text-xs sm:text-sm sm:w-18 lg:text-base bg-gray-200 disabled:opacity-50 rounded"
        >
          Previous
        </button>

        {page && (
          <span className="sm:hidden">
            <div className="flex justify-center items-center">
              <input
                type="Number"
                className="w-5 h-5"
                onChange={(e) => {
                  setPageNum(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchParams((prev) => {
                      const params = new URLSearchParams(prev);
                      if (pageNum > totalPages || pageNum === totalPages) {
                        params.set("page", totalPages);
                        return params;
                      }
                      if (pageNum > 0 && pageNum < totalPages) {
                        params.set("page", pageNum);
                        return params;
                      }
                      if (pageNum < 1 || pageNum === 1) {
                        params.set("page", 1);
                        return params;
                      }
                    });
                    scrollToTop();
                  }
                }}
                value={pageNum}
              />
              of {totalPages}
            </div>
          </span>
        )}

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded hidden text-sm sm:flex ${
              page === i + 1 ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("page", i + 1);
                return params;
              });
              scrollToTop();
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => {
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("page", page + 1);
              return params;
            });
            scrollToTop();
          }}
          className="px-4 py-2 w-15 text-xs sm:text-sm sm:w-18 lg:text-base flex justify-center bg-gray-200 disabled:opacity-50 rounded"
        >
          Next
        </button>
      </div>
    );
  }
}

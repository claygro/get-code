import { useState, useEffect, type ChangeEvent } from "react";
import connection from "../config/connection.config";

const SearchSnippets = ({ setSearchSnippets }: any) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Search after debounce
  async function searchSnippets() {
    if (debouncedQuery.trim() === "") {
      setSearchSnippets(null);
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await connection.post("/snippets/search", {
        query: debouncedQuery,
      });

      setSearchSnippets(data);
    } catch (error: any) {
      console.log(error.message);
      setSearchSnippets(null);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    searchSnippets();
  }, [debouncedQuery]);

  return (
    <>
      <div className="w-full flex justify-center mt-8">
        <div className="w-full flex justify-between items-center gap-x-10">
          <div className="bg-white flex-1 rounded-2xl shadow-md border border-blue-100 transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400">
            <input
              value={query}
              type="text"
              onChange={handleChange}
              placeholder="Search snippets..."
              className="flex-1 px-6 py-4 w-full text-gray-700 text-lg outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            disabled
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-semibold"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchSnippets;

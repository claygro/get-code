import { useState, type ChangeEvent } from "react";
import connection from "../config/connection.config";
import toast, { Toaster } from "react-hot-toast";
const SearchSnippets = ({ setSearchSnippets }: any) => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  async function handleSnippetsSubmit(e: any) {
    try {
      e.preventDefault();
      if (query.length <= 0) {
        toast.error("Please add query first");
        return;
      }
      setIsLoading(true);
      const snippets = await connection.post("/snippets/search", { query });
      setIsLoading(false);
      setQuery("");
      setSearchSnippets(snippets.data);
    } catch (error: any) {
      console.log(`Failed to search: ${error.message}`);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full flex justify-center mt-8 ">
        <form
          onSubmit={handleSnippetsSubmit}
          className="w-full flex justify-between items-center gap-x-10   "
        >
          <div className=" bg-white flex-1 rounded-2xl shadow-md border border-blue-100  transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400">
            <input
              value={query}
              type="text"
              onChange={handleChange}
              placeholder="Search snippets..."
              className="flex-1 px-6 py-4 w-full text-gray-700 text-lg outline-none placeholder:text-gray-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl h-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300"
            >
              {isLoading ? "searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchSnippets;

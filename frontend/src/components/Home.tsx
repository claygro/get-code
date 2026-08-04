import { useContext, useEffect, useState } from "react";
import { timeAgo } from "../utils/timeAgo";
import { SnippetsContext } from "../context/Snippets";
import { useNavigate } from "react-router-dom";
import SearchSnippets from "./SearchSnippets";

const Home = () => {
  const { snippets, getSnippets } = useContext(SnippetsContext);
  const [searchSnippets, setSearchSnippets] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSnippets();
  }, []);

  return (
    <>
      <div className="w-full space-y-4 px-4 md:px-20 mt-4">
        <SearchSnippets setSearchSnippets={setSearchSnippets} />

        {(searchSnippets?.length || snippets.length) > 0 ? (
          (searchSnippets?.length > 0 ? searchSnippets : snippets)
            .slice()
            .reverse()
            .map((snippet: any) => (
              <div
                key={snippet._id}
                onClick={() =>
                  navigate(`/layout/snippetsPreview/${snippet._id}`)
                }
                className="w-full flex items-center justify-between px-4 py-4 md:px-8 md:py-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    loading="lazy"
                    src={snippet.userId.avatar}
                    alt="User Avatar"
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0 px-3 md:px-6 text-left">
                  <h1 className="text-base md:text-lg font-semibold text-gray-800 truncate">
                    {snippet.title}
                  </h1>
                </div>

                {/* Time */}
                <div className="flex-shrink-0 text-xs md:text-sm font-medium text-gray-400 whitespace-nowrap">
                  {timeAgo(snippet.createdAt)}
                </div>
              </div>
            ))
        ) : searchSnippets ? (
          <p className="text-center text-gray-500 mt-10">No snippets found</p>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No snippets uploaded
          </p>
        )}
      </div>
    </>
  );
};

export default Home;

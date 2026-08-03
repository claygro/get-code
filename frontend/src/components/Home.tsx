import { useContext, useEffect } from "react";

import { timeAgo } from "../utils/timeAgo";
import { SnippetsContext } from "../context/Snippets";
import { useNavigate } from "react-router-dom";
import SearchSnippets from "./SearchSnippets";
const Home = () => {
  const { snippets, getSnippets } = useContext(SnippetsContext);
  const navigate = useNavigate();
  useEffect(() => {
    getSnippets();
  }, []);
  return (
    <>
      <SearchSnippets />
      <div className="w-full space-y-4 px-4 md:px-20 mt-4">
        {snippets
          .slice()
          .reverse()
          .map((snippet: any) => (
            <div
              key={snippet._id}
              onClick={() => navigate(`/layout/snippetsPreview/${snippet._id}`)}
              // Reduced internal padding on mobile (px-4 py-4) and kept original for desktop (md:px-8 md:py-6)
              className="w-full flex items-center justify-between px-4 py-4 md:px-8 md:py-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
            >
              {/* 1. Avatar (Left) */}
              <div className="flex-shrink-0">
                {snippet.userId.avatar ? (
                  <img
                    loading="lazy"
                    src={snippet.userId.avatar}
                    alt="User Avatar"
                    // Slightly smaller avatar on mobile (w-12 h-12)
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  "Loading..."
                )}
              </div>

              {/* 2. Title (Middle) */}
              {/* Reduced gap padding on mobile (px-3) so the title has maximum room to display before truncating */}
              <div className="flex-1 min-w-0 px-3 md:px-6 text-left">
                <h1 className="text-base md:text-lg font-semibold text-gray-800 truncate transition-colors duration-200">
                  {snippet.title}
                </h1>
              </div>

              {/* 3. Time (Right) */}
              {/* Slightly smaller text on mobile (text-xs) to save space */}
              <div className="flex-shrink-0 text-xs md:text-sm font-medium text-gray-400 whitespace-nowrap">
                {timeAgo(snippet.createdAt)}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;

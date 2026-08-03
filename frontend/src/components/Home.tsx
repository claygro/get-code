import { useEffect, useState } from "react";
import connection from "../config/connection.config";
import { timeAgo } from "../utils/timeAgo";

const Home = () => {
  interface User {
    avatar: string;
  }
  interface Snippet {
    title: string;
    _id: string;
    userId: User;
    createdAt: string;
  }

  const [snippets, setSnippets] = useState<Snippet[]>([]);

  async function getSnippets() {
    try {
      const data = await connection.get("/snippets/read");
      setSnippets(data.data);
    } catch (error: any) {
      console.log(`Failed to fetch snippets: ${error.message}`);
    }
  }

  useEffect(() => {
    getSnippets();
  }, []);

  return (
    <>
      <div className="w-full space-y-4 px-20 mt-4">
        {snippets
          .slice()
          .reverse()
          .map((snippet) => (
            <div
              key={snippet._id}
              className="w-full flex items-center justify-between px-8 py-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
            >
              {/* 1. Avatar (Left) */}
              <div className="flex-shrink-0">
                <img
                  src={snippet.userId.avatar}
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>

              {/* 2. Title (Middle) */}
              <div className="flex-1 min-w-0 px-6 text-left">
                <h1 className="text-lg font-semibold text-gray-800 truncate transition-colors duration-200">
                  {snippet.title}
                </h1>
              </div>

              {/* 3. Time (Right) */}
              <div className="flex-shrink-0 text-sm font-medium text-gray-400 whitespace-nowrap">
                {timeAgo(snippet.createdAt)}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;

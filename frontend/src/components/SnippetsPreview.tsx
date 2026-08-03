import { useParams } from "react-router-dom";
import { SnippetsContext } from "../context/Snippets";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaClock, FaGithub, FaLinkedin } from "react-icons/fa";

const SnippetsPreview = () => {
  const { id } = useParams();
  const [snippetsPreview, setSnippetsPreview] = useState<any>(null);

  const { snippets } = useContext(SnippetsContext);

  useEffect(() => {
    const snippet = snippets.find((item: any) => item._id === id);
    if (snippet) {
      setSnippetsPreview(snippet);
    }
  }, [id, snippets]);

  if (!snippetsPreview) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-gray-500 text-lg">Loading snippet...</h1>
      </div>
    );
  }

  const copyCode = () => {
    toast.success("Copied to your clipboard");
    navigator.clipboard.writeText(snippetsPreview.code);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        {/* User Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row md:items-center gap-6">
          <img
            src={snippetsPreview.userId.avatar}
            alt=""
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {snippetsPreview.userId.userName}
            </h1>

            <p className="text-gray-600 mt-1">{snippetsPreview.userId.bio}</p>

            <p className="text-sm text-gray-500 mt-2">
              {snippetsPreview.userId.experience}
            </p>

            <div className="flex items-center gap-5 mt-5">
              <a
                href={snippetsPreview.userId.github}
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black"
              >
                <FaGithub size={20} />
                GitHub
              </a>

              <a
                href={snippetsPreview.userId.linkedIn}
                target="_blank"
                className="flex items-center gap-2 text-blue-600"
              >
                <FaLinkedin size={20} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Snippet */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 mt-8 overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
                {snippetsPreview.language}
              </span>

              <div className="flex items-center text-gray-500 gap-2">
                <FaClock size={18} />
                {new Date(snippetsPreview.createdAt).toLocaleDateString()}
              </div>
            </div>

            <h1 className="text-3xl font-bold mt-6 text-gray-900">
              {snippetsPreview.title}
            </h1>

            <p className="text-gray-600 leading-8 mt-4">
              {snippetsPreview.description}
            </p>
          </div>

          {/* Code Header */}

          <div className="bg-[#1E1E1E] flex justify-between items-center px-6 py-4">
            <span className="text-white font-medium">
              {snippetsPreview.language}
            </span>

            <button
              onClick={copyCode}
              className="text-white hover:text-blue-400 cursor-pointer flex items-center gap-2"
            >
              <FaClock size={18} />
              Copy
            </button>
          </div>

          {/* Code */}

          <pre className="bg-[#111827] text-green-400 h-96 overflow-auto p-8 text-sm leading-7">
            <code>{snippetsPreview.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SnippetsPreview;

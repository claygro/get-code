import { useState } from "react";
import connection from "../config/connection.config";
import toast, { Toaster } from "react-hot-toast";
const Upload = () => {
  const [uploadSnippets, setUploadSnippets] = useState({
    title: "",
    code: "",
    description: "",
    language: "",
  });
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleSnippetsChange = (e: any) => {
    setUploadSnippets((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSnippetsSubmit = async () => {
    try {
      setIsUploaded(true);
      await connection.post("/snippets/upload", uploadSnippets);
      setIsUploaded(false);
      toast.success("Snippets uploaded successfully");
      setUploadSnippets({
        title: "",
        code: "",
        description: "",
        language: "",
      });
    } catch (error: any) {
      setIsUploaded(false); // Reset loading state if the request fails
      toast.error("Failed to upload snippets. Please try again later");
      console.log(`Failed to submit the snippets: ${error.message}`); // Removed extra '}'
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white text-black px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold tracking-tight">
              Upload Snippet
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              Save and organize your code snippets.
            </p>
          </div>

          {/* Title */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Title</label>

            <input
              required
              value={uploadSnippets.title}
              type="text"
              name="title"
              onChange={handleSnippetsChange}
              placeholder="Authentication using JWT"
              className="w-full border-b-2 border-black bg-transparent py-3 text-lg outline-none placeholder:text-gray-400 focus:border-gray-600 transition"
            />
          </div>

          {/* Language */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Language</label>

            <input
              required
              value={uploadSnippets.language}
              type="text"
              name="language"
              onChange={handleSnippetsChange}
              placeholder="JavaScript"
              className="w-full border-b-2 border-black bg-transparent py-3 text-lg outline-none placeholder:text-gray-400 focus:border-gray-600 transition"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              required
              value={uploadSnippets.description}
              rows={3}
              name="description"
              onChange={handleSnippetsChange}
              placeholder="Write description here..."
              className="w-full border-b-2 border-black bg-transparent py-3 resize-none outline-none placeholder:text-gray-400 focus:border-gray-600 transition"
            />
          </div>

          {/* Code */}
          <div className="mb-10">
            <label className="block text-sm font-medium mb-2">Code</label>

            <textarea
              required
              value={uploadSnippets.code}
              rows={18}
              name="code"
              onChange={handleSnippetsChange}
              placeholder="// Write your code here..."
              className="w-full border border-black p-5 font-mono text-[15px] outline-none resize-none bg-black text-white placeholder:text-gray-500 focus:border-gray-700 transition"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSnippetsSubmit}
            disabled={isUploaded}
            className="border-2 border-black px-8 py-3 text-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploaded ? "Uploading..." : "Upload Snippet"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Upload;

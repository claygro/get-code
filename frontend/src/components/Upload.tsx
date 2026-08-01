import { useState } from "react";
import connection from "../config/connection.config";

const Upload = () => {
  const [uploadSnippits, setUploadSnippits] = useState({
    title: "",
    code: "",
    description: "",
    language: "",
  });
  const handleSnippitsChange = (e: any) => {
    setUploadSnippits((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSnipptsSubmit = async () => {
    try {
      const data = await connection.post("/snippts/upload", uploadSnippits);
      console.log(data);
    } catch (error: any) {
      console.log(`Failed to submit the snippits: ${error.message}}`);
    }
  };
  return (
    <>
      <div>
        <input
          onChange={handleSnippitsChange}
          name="title"
          className="outline-2"
          type="text"
        />
        <textarea
          onChange={handleSnippitsChange}
          className="outline-2"
          name="code"
        />
        <input
          onChange={handleSnippitsChange}
          name="description"
          className="outline-2"
          type="text"
        />
        <input
          onChange={handleSnippitsChange}
          name="language"
          className="outline-2"
          type="text"
        />
        <button onClick={handleSnipptsSubmit}>Upload</button>
      </div>
    </>
  );
};

export default Upload;

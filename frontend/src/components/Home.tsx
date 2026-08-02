import { useEffect, useState } from "react";
import connection from "../config/connection.config";
const Home = () => {
  const [snippits, setSnippits] = useState();
  async function getSnippits() {
    try {
      const data = await connection.get("/snippits/read");
      console.log(data.data);
    } catch (error: any) {
      console.log(`Failed to fetch snippits: ${error.message}}`);
    }
  }
  useEffect(() => {
    getSnippits();
  }, []);
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;

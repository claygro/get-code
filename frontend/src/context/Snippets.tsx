import { createContext, useState, useEffect } from "react";
import connection from "../config/connection.config";
export const SnippetsContext = createContext<any | null>(null);
export const SnippetsProvider = ({ children }: any) => {
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
    <SnippetsContext.Provider value={{ snippets, getSnippets }}>
      {children}
    </SnippetsContext.Provider>
  );
};

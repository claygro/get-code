import "./App.css";
import Signup from "./components/auth/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LayOut from "./components/LayOut";
import Upload from "./components/Upload";
import Profile from "./components/Profile";
import { SnippetsProvider } from "./context/Snippets";
import SnippetsPreview from "./components/SnippetsPreview";
function App() {
  return (
    <>
      <Router>
        <SnippetsProvider>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/layout" element={<LayOut />}>
              <Route index element={<Home />} />
              <Route path="upload" element={<Upload />} />
              <Route path="profile" element={<Profile />} />
              <Route path="snippetsPreview/:id" element={<SnippetsPreview />} />
            </Route>
          </Routes>
        </SnippetsProvider>
      </Router>
    </>
  );
}

export default App;

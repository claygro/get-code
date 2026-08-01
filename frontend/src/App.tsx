import "./App.css";
import Signup from "./components/auth/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LayOut from "./components/LayOut";
import Upload from "./components/Upload";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/layout" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="upload" element={<Upload />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

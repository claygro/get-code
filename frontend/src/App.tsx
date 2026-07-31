import "./App.css";
import Signup from "./components/auth/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        
        <Signup />
      </Router>
    </>
  );
}

export default App;

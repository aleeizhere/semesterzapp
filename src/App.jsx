import Login from "./login/Login";
import Signup from "./signup/Signup";
import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

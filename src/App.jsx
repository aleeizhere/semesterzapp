import Login from "./login/Login";
import Signup from "./signup/Signup";
import { Routes, Route } from "react-router-dom";
import Student from "./student/Student";
import Teacher from "./teacher/Teacher";
import Proposals from "./student/Proposals";

import Problempage from "./Problempage";
import Admin from "./admin/Admin";
import "./output.css";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<Student />}></Route>
        <Route path="/teacher" element={<Teacher />}></Route>
        <Route path="/student/proposals" element={<Proposals />}></Route>
        <Route path="/problempage" element={<Problempage />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default App;

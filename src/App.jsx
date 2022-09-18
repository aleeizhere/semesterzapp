import Login from "./login/Login";
import Signup from "./signup/Signup";
import { Routes, Route } from "react-router-dom";

import Student from "./student/Student";
import Teacher from "./teacher/Teacher";
import Proposals from "./student/Proposals";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<Student />}></Route>
        <Route path="/teacher" element={<Teacher />}></Route>
        <Route path="/student/proposals" element={<Proposals />}></Route>
      </Routes>
    </div>
  );
}

export default App;

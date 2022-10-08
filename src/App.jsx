import Login from "./login/Login";
import Signup from "./signup/Signup";
import { Routes, Route } from "react-router-dom";
import Student from "./student/Student";
import Teacher from "./teacher/Teacher";
import Proposals from "./student/Proposals";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Problempage from "./Problempage";
import Admin from "./admin/Admin";

function App() {
  return (
    <div className="App">
      <Typography variant="h6" fontSize={15}>
        <Typography
          variant="body"
          fontWeight="bolder"
          fontSize={30}
          ml={3}
          color="#039be5"
        >
          Semesterz
        </Typography>{" "}
        Study Remotely
      </Typography>
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

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });
  const [issues, setIssues] = useState("");
  const [showAlert, setShowAlert] = useState("none");

  const clear = () => {
    setUserCreds({
      fullname: "",
      email: "",
      username: "",
      password: "",
      role: "",
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(userCreds.email)) {
      alert("Invalid Email");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3333/auth/signup",
          userCreds
        );
        setIssues(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (e) {
        setIssues(e.response.data.message);
      }
      clear();
      setShowAlert("");
      setTimeout(() => {
        setShowAlert("none");
      }, 2000);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex items-center w-full bg-slate-600 h-8 px-8 text-lg text-white font-logo font-semibold justify-center md:justify-start lg:justify-start">
        Semester
        <span className="text-orange-400 font-logo font-semibold">z</span>
      </div>
      <div>
        <Alert severity="info" sx={{ display: `${showAlert}` }}>
          {issues}
        </Alert>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <form
          autoComplete="off"
          noValidate
          style={{ margin: 2, width: "20rem" }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Sign Up
          </Typography>
          {/* <TextField
            name="name"
            variant="outlined"
            label="Full Name"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.fullname}
            onChange={(e) =>
              setUserCreds({ ...userCreds, fullname: e.target.value })
            }
          /> */}
          <input
            placeholder="Full Name"
            type="text"
            className="w-full outline-1 outline-gray-200 px-3 py-2 border-1 border-gray-200 rounded-md mb-3"
            value={userCreds.fullname}
            onChange={(e) =>
              setUserCreds({ ...userCreds, fullname: e.target.value })
            }
          />
          {/* <TextField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.email}
            onChange={(e) =>
              setUserCreds({ ...userCreds, email: e.target.value })
            }
          /> */}
          <input
            placeholder="Email"
            type="text"
            className="w-full outline-1 outline-gray-200 px-3 py-2 border-1 border-gray-200 rounded-md mb-3"
            value={userCreds.email}
            onChange={(e) =>
              setUserCreds({ ...userCreds, email: e.target.value })
            }
          />
          {/* <TextField
            name="username"
            variant="outlined"
            label="Username"
            type="text"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.username}
            onChange={(e) =>
              setUserCreds({ ...userCreds, username: e.target.value })
            }
          /> */}
          <input
            placeholder="Username"
            type="text"
            className="w-full outline-1 outline-gray-200 px-3 py-2 border-1 border-gray-200 rounded-md mb-3"
            value={userCreds.username}
            onChange={(e) =>
              setUserCreds({ ...userCreds, username: e.target.value })
            }
          />
          {/* <TextField
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.password}
            onChange={(e) =>
              setUserCreds({ ...userCreds, password: e.target.value })
            }
          /> */}
          <input
            placeholder="Password"
            type="password"
            className="w-full outline-1 outline-gray-200 px-3 py-2 border-1 border-gray-200 rounded-md mb-3"
            value={userCreds.password}
            onChange={(e) =>
              setUserCreds({ ...userCreds, password: e.target.value })
            }
          />
          <FormControl sx={{ mt: 1 }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Who are you?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={userCreds.role}
              row
              onChange={(e) =>
                setUserCreds({ ...userCreds, role: e.target.value })
              }
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="teacher"
                control={<Radio />}
                label="Teacher"
              />
            </RadioGroup>
          </FormControl>
          <div className="flex flex-col items-center">
            <button className="mb-3 bg-slate-600 text-white w-full py-2 rounded-full hover:bg-gray-800 active:w-5/6 transition-all ease-out">
              Submit
            </button>
            <div
              onClick={clear}
              className="mb-3 bg-slate-600 text-white w-full py-2 rounded-full hover:bg-gray-800 active:w-5/6 transition-all ease-out text-center cursor-pointer"
            >
              Clear
            </div>
          </div>
        </form>
        <Typography sx={{ color: "#90a4ae" }} variant="p" component="span">
          Already have an account?
        </Typography>
        <Link
          sx={{ cursor: "pointer", color: "#607d8b" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Log In
        </Link>
      </div>
      <div className="flex items-center justify-center w-full bg-slate-700 h-20 lg:h-4 text-white text-center text-tiny">
        All Rights Reserved - Semesterz
      </div>
    </div>
  );
};

export default Signup;

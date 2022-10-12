import { Button, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userActions } from "../store/userSlice";
import { backendUri } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.user);
  const [issues, setIssues] = useState("none");

  useEffect(() => {
    if (loginData.role) {
      navigate(`${loginData.role}`);
    }
  }, [loginData]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userApiData = await axios.post(
        `${backendUri}/auth/login`,
        loginInfo
      );
      dispatch(userActions.setCurrentUser(userApiData.data.user));
    } catch (e) {
      if (e.response.data.status >= 400) {
        setIssues("block");
        setTimeout(() => {
          setIssues("none");
        }, 3000);
      }
    }
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex items-center w-full bg-slate-600 h-8 px-8 text-lg text-white font-logo font-semibold justify-center md:justify-start lg:justify-start">
        Semester
        <span className="text-orange-400 font-logo font-semibold">z</span>
      </div>
      <div className="px-4 py-12 flex flex-col items-center justify-center">
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="relative mt-16 lg:mt-4 border-1 border-gray-300 w-full md:w-1/3 h-100 px-6 flex flex-col justify-center items-center rounded-xl shadow-xl"
        >
          <div
            style={{ display: `${issues}` }}
            className="text-white bg-red-400 px-6 py-1 rounded-full absolute top-20"
          >
            Incorrect username or password
          </div>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Login to Semesterz
          </Typography>

          <input
            placeholder="username"
            type="text"
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, username: e.target.value });
            }}
            className="w-full outline-1 outline-gray-200 px-3 py-2 border-1 border-gray-200 rounded-md mb-3"
          />
          <input
            placeholder="password"
            type="password"
            className="w-full outline-1 outline-gray-200 px-3 py-2 border-1 border-gray-200 rounded-md mb-3"
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, password: e.target.value });
            }}
          />

          <button
            type="submit"
            className="mb-3 bg-slate-600 text-white w-full py-2 rounded-full hover:bg-gray-800 active:w-5/6 transition-all ease-out"
          >
            Sign In
          </button>

          {/* <div className="w-full before:content-[''] before:bg-black before:w-10 before:h-px before:inline-block before:relative before:align-middle before:right-10 before:-ml-16 after:content-[''] after:bg-black after:w-10 after:h-px after:inline-block after:relative after:align-middle after:left-10 after:-mr-16">
            Dont Have an Account
          </div> */}
          <div className="text-gray-400 font-light text-sm">
            dont have an account?
          </div>
          <button
            className=""
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center w-full bg-slate-700 h-20 lg:h-4 text-white text-center text-tiny">
        All Rights Reserved - Semesterz
      </div>
    </div>
  );
};

export default Login;

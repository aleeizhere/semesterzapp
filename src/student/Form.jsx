import React, { useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { backendUri } from "../constants";
const Form = ({ currentUser, setChanged, changed }) => {
  const [postDataInput, setPostDataInput] = useState({
    subject: "",
    description: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post(`${backendUri}/posts/create`, {
      username: currentUser.username,
      fullname: currentUser.fullname,
      subject: postDataInput.subject,
      description: postDataInput.description,
    });
    setChanged(!changed);
    setPostDataInput({ ...postDataInput, description: "", subject: "" });
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col justify-around bg-gradient-to-tr from-gray-100 to-slate-300 w-full  py-6 px-4 rounded-lg h-96">
          <h4 className="text-3xl opacity-60">Post a Job</h4>
          <div className="flex w-full flex-col mt-8 mb-10 justify-between">
            <input
              className="py-2 px-5 rounded-full mb-4 focus:shadow-lg outline-none transition-shadow"
              placeholder="Subject"
              value={postDataInput.subject}
              onChange={(e) => {
                setPostDataInput({
                  ...postDataInput,
                  subject: e.target.value,
                });
              }}
            />
            <textarea
              rows="4"
              cols="50"
              className="py-2 px-5 resize-none rounded-2xl  focus:shadow-lg outline-none transition-shadow"
              placeholder="Description"
              value={postDataInput.description}
              onChange={(e) => {
                setPostDataInput({
                  ...postDataInput,
                  description: e.target.value,
                });
              }}
            />
          </div>
          <button
            className="select-none text-xl text-white bg-gradient-to-bl transition-all active:scale-95 outline-none active:bg-gradient-to-bl active:from-slate-500 active:to-slate-700 from-slate-500 to-slate-700 rounded-full"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

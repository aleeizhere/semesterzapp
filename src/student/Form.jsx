import React, { useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postActions } from "../store/postSlice";

const Form = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [postDataInput, setPostDataInput] = useState({
    subject: "",
    description: "",
  });

  async function handleSubmit(e) {
    await axios.post("http://localhost:3333/posts/create", {
      username: currentUser.username,
      fullname: currentUser.fullname,
      subject: postDataInput.subject,
      description: postDataInput.description,
    });
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <Box m={3} p={2} bgcolor={"#efebe9"} width="30rem">
          <Typography variant="h5" mb={3}>
            Post a Job
          </Typography>
          <TextField
            fullWidth
            required
            id="filled-basic"
            label="Subject"
            variant="filled"
            sx={{ mb: 3 }}
            value={postDataInput.subject}
            onChange={(e) => {
              setPostDataInput({ ...postDataInput, subject: e.target.value });
            }}
          />
          <TextField
            fullWidth
            required
            id="filled-basic"
            label="Description"
            variant="filled"
            sx={{ mb: 3 }}
            multiline
            rows={5}
            value={postDataInput.description}
            onChange={(e) => {
              setPostDataInput({
                ...postDataInput,
                description: e.target.value,
              });
            }}
          />
          <Button fullWidth type="submit" variant="contained">
            Post a Job
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Form;

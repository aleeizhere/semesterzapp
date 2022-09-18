import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3333/auth/signup",
        userCreds
      );
      setIssues(response.data.message);
    } catch (e) {
      setIssues(e.response.data.message);
    }
    clear();
    setShowAlert("");
    setTimeout(() => {
      setShowAlert("none");
    }, 2000);
  };

  return (
    <>
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
          <TextField
            name="name"
            variant="outlined"
            label="Full Name"
            fullWidth
            sx={{ mb: 1 }}
            value={userCreds.fullname}
            onChange={(e) =>
              setUserCreds({ ...userCreds, fullname: e.target.value })
            }
          />
          <TextField
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
          />
          <TextField
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
          />
          <TextField
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

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ mb: 2 }}
            fullWidth
          >
            Submit
          </Button>
          <Button
            onClick={clear}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
          >
            Clear
          </Button>
        </form>
        <Typography sx={{ color: "#90a4ae" }} variant="p" component="span">
          Already have an account?
        </Typography>
        <Link href="/" sx={{ color: "#607d8b" }}>
          Log In
        </Link>
      </div>
    </>
  );
};

export default Signup;

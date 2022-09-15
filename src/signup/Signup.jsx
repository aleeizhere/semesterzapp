import React from "react";
import {
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
  return (
    <>
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
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 1 }}
          />

          <FormControl sx={{ mt: 1 }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Who are you?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="student"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="instructor"
                control={<Radio />}
                label="Instructor"
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
          <Button variant="contained" color="secondary" size="small" fullWidth>
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

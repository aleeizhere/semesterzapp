import { Button, Link, TextField, Typography } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
            Login
          </Typography>

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

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ mb: 2 }}
            fullWidth
          >
            Sign In
          </Button>
        </form>
        <Link href="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;

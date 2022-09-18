import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const Teacher = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 2rem",
        }}
      >
        <Typography variant="h5" component="span" color="#a1887f" mb={3}>
          Welcome, <span style={{ color: "#212121" }}>DummyName</span>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            sessionStorage.clear();
            window.location.replace("/");
          }}
        >
          Logout
        </Button>
      </div>
      <Grid
        container
        columnSpacing={4}
        width="90%"
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt="2rem"
        m="4rem 5rem"
        p="2rem 1rem"
        border="1px solid red"
      >
        <Post />
        <Post />
        <Post />
        <Post />
      </Grid>
    </>
  );
};

export default Teacher;

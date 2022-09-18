import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const Post = () => {
  return (
    <Grid item>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#b3e5fc",
          borderRadius: "10px",
          padding: "1rem",
        }}
      >
        <Typography variant="p" fontSize={15} textAlign="center">
          Student Name:
        </Typography>
        <Typography
          variant="p"
          fontSize={13}
          textAlign="center"
          sx={{ opacity: "0.6" }}
        >
          Username
        </Typography>
        <Typography variant="h5" fontSize={20} textAlign="center" mt={3} mb={3}>
          Subject
        </Typography>
        <Button variant="contained" sx={{ color: "#303f9f", color: "white" }}>
          Submit a Proposal
        </Button>
      </div>
    </Grid>
  );
};

export default Post;

import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";

const Problempage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Seems like you're already signed in.</Typography>
      <Button
        variant="contained"
        aria-label="delete"
        onClick={() => {
          navigate("/");
        }}
      >
        <LinkIcon sx={{ marginRight: "10px" }}></LinkIcon>
        Go to your Account
      </Button>
    </Box>
  );
};

export default Problempage;

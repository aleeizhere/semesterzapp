import { Grid, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const EngagedPosts = ({ engagedPosts }) => {
  return !engagedPosts ? (
    <Box sx={{ width: "60%" }}>
      <LinearProgress />
    </Box>
  ) : !engagedPosts.length ? (
    <h4 style={{ opacity: "0.4  ", margin: "auto" }}>No Proposal Made Yet</h4>
  ) : (
    engagedPosts.map((post) => (
      <Grid item key={post._id}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#b3e5fc",
            borderRadius: "10px",
            padding: "1rem",
            width: "10rem",
          }}
        >
          <Typography variant="p" fontSize={15} textAlign="center">
            {post.fullname}
          </Typography>
          <Typography
            variant="p"
            fontSize={13}
            textAlign="center"
            sx={{ opacity: "0.6" }}
          >
            {post.creator}
          </Typography>
          <Typography
            variant="h5"
            fontSize={20}
            textAlign="center"
            mt={3}
            mb={3}
          >
            {post.subject}
          </Typography>
        </div>
      </Grid>
    ))
  );
};
export default EngagedPosts;

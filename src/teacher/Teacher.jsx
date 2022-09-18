import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Teacher = async () => {
  const [posts, setPosts] = useState([]);

  const x = await axios.get("http:localhost:3333/posts/getallposts");
  setPosts(x);
  console.log(posts);
  return !posts.length ? (
    <div>
      <CircularProgress></CircularProgress>
    </div>
  ) : (
    <h1></h1>
  );
};

export default Teacher;

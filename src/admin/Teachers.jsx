import { Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const Teachers = ({ changed, setChanged }) => {
  const teachersData = useSelector((state) => state.admin.teachers);

  async function handleDelete(username) {
    await axios.post(`http://localhost:3333/auth/deleteuser/${username}`);
    setChanged(!changed);
  }
  return teachersData ? (
    teachersData.length ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" mt={5} mb={3}>
          Registered Teachers
        </Typography>
        {teachersData.map((i) => {
          return (
            <div
              key={i._id}
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "10px",
                padding: "1rem 4rem",
                backgroundColor: "#b2ebf2",
                borderRadius: "10px",
              }}
            >
              <div style={{ width: "25rem" }}>
                <h6 style={{ margin: 0 }}>Username</h6>
                <div>{i.username}</div>
              </div>
              <div style={{ width: "25rem" }}>
                <h6 style={{ margin: 0 }}>Name</h6>
                <div>{i.fullname}</div>
              </div>
              <div
                style={{
                  width: "15rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="container"
                  sx={{ backgroundColor: "#e8eaf6" }}
                  size="small"
                  onClick={() => {
                    handleDelete(i.username);
                  }}
                >
                  Delete Profile
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">No teachers are registered</Typography>
      </div>
    )
  ) : (
    <div>
      <CircularProgress></CircularProgress>
    </div>
  );
};

export default Teachers;

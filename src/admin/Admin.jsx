import React, { useEffect, useState } from "react";
import { fetchSetAdminData } from "../store/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import Teachers from "./Teachers";
import Students from "./Students";
const Admin = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const adminData = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (userData.role === "admin") {
      dispatch(fetchSetAdminData());
    } else if (!userData.role) {
      navigate("/");
    } else {
      navigate("/problempage");
    }
    // console.log(adminData);
  }, [changed]);
  return adminData.students ? (
    <>
      <Button
        type="submit"
        variant="contained"
        onClick={() => {
          dispatch(userActions.removeCurrentUser());
          navigate("/");
        }}
        sx={{ position: "absolute", right: 10 }}
      >
        Logout
      </Button>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* proposals and posts */}
        <div
          style={{
            width: "90vw",
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "2rem",
            marginTop: "5rem",
          }}
        >
          <div
            style={{
              width: "30%",
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1rem",
            }}
          >
            <h5 style={{ padding: "0", margin: "0" }}>No. of Posts</h5>
            <h5 style={{ padding: "0", margin: "0", fontSize: "2rem" }}>
              {adminData.noPosts}
            </h5>
          </div>
          <div
            style={{
              width: "30%",
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1rem",
            }}
          >
            <h5 style={{ padding: "0", margin: "0" }}>No. of proposals</h5>
            <h5 style={{ padding: "0", margin: "0", fontSize: "2rem" }}>
              {adminData.noProposals}
            </h5>
          </div>
        </div>
        {/* Accepted and Rejected Numbers */}
        <div
          style={{
            width: "90vw",
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "20%",
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1rem",
            }}
          >
            <h5 style={{ padding: "0", margin: "0" }}>
              No. of Accepted Proposals
            </h5>
            <h5 style={{ padding: "0", margin: "0", fontSize: "2rem" }}>
              {adminData.noAccepted}
            </h5>
          </div>
          <div
            style={{
              width: "20%",
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1rem",
            }}
          >
            <h5 style={{ padding: "0", margin: "0" }}>
              No. of Rejected Proposals
            </h5>
            <h5 style={{ padding: "0", margin: "0", fontSize: "2rem" }}>
              {adminData.noRejected}
            </h5>
          </div>
          <div
            style={{
              width: "20%",
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "1rem",
            }}
          >
            <h5 style={{ padding: "0", margin: "0" }}>
              No. of Pending Proposals
            </h5>
            <h5 style={{ padding: "0", margin: "0", fontSize: "2rem" }}>
              {adminData.noPending}
            </h5>
          </div>
        </div>
      </div>
      <Teachers changed={changed} setChanged={setChanged} />
      <Students changed={changed} setChanged={setChanged} />
    </>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress></CircularProgress>
    </div>
  );
};

export default Admin;

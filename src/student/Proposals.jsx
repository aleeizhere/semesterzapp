import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postActions } from "../store/postSlice";
import { fetchProposals } from "../store/proposalActions";

const Proposals = () => {
  const selectedPostId = useSelector((state) => state.post.selectedPost);
  const dispatch = useDispatch();
  const proposals = useSelector((state) => state.proposals.proposals);
  const [dataChanged, setDataChanged] = useState(false);
  //this postId data should be dispatched and the state must be updated with the array of proposal objects
  useEffect(() => {
    //yahan selectedPostId state main se hat rahi hai tabhi proposals fetch nhi horahay
    // i want this to dispatch action only once
    dispatch(fetchProposals(selectedPostId));
  }, [dataChanged]);

  async function handleAccept(proposalId) {
    await axios.post("http://localhost:3333/proposal/acceptproposal", {
      proposalId,
    });
    setDataChanged(!dataChanged);
  }
  async function handleReject(proposalId) {
    await axios.post("http://localhost:3333/proposal/rejectproposal", {
      proposalId,
    });
    setDataChanged(!dataChanged);
  }
  return !proposals ? (
    <CircularProgress></CircularProgress>
  ) : !proposals.length ? (
    <h4>No Proposals yet</h4>
  ) : (
    <>
      <div
        style={{
          paddingLeft: "10rem",
        }}
      >
        <h3>Proposals</h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "2rem",
          flexDirection: "column-reverse",
        }}
      >
        {proposals.map((i) => (
          <div
            key={i._id}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginBottom: "10px",
              padding: "1rem 4rem",
              backgroundColor: "#b2ebf2",
              width: "60rem",
              borderRadius: "10px",
            }}
          >
            <div style={{ width: "25rem" }}>
              <h6 style={{ margin: 0 }}>Username</h6>
              <div>{i.teacherUsername}</div>
            </div>
            <div style={{ width: "25rem" }}>
              <h6 style={{ margin: 0 }}>Name</h6>
              <div>{i.fullname}</div>
            </div>
            <div style={{ width: "10rem" }}>
              <h6 style={{ margin: 0 }}>Price</h6>
              <div>{i.price}</div>
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
                  handleAccept(i._id);
                }}
              >
                Accept
              </Button>
              <Button
                variant="container"
                sx={{ backgroundColor: "#e8eaf6" }}
                size="small"
                onClick={() => {
                  handleReject(i._id);
                }}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Proposals;

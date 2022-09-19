import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

const Form = ({ setProposalData, proposalData }) => {
  async function sendProposal(e) {
    const response = await axios.post(
      "http://localhost:3333/proposal/create",
      proposalData
    );
    console.log(response);
  }
  return (
    <form
      onSubmit={() => {
        sendProposal();
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" mb={5}>
          Enter the Amount
        </Typography>
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          sx={{ marginBottom: "1rem" }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => {
            setProposalData({ ...proposalData, price: e.target.value });
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ color: "#303f9f", color: "white" }}
        >
          Send A Proposal
        </Button>
      </div>
    </form>
  );
};

export default Form;

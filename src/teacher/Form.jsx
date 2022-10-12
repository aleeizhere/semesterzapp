import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { backendUri } from "../constants";

const Form = ({
  setProposalData,
  proposalData,
  changed,
  setChanged,
  setOpen,
}) => {
  async function sendProposal(e) {
    e.preventDefault();
    const response = await axios.post(
      `${backendUri}/proposal/create`,
      proposalData
    );
    setChanged(!changed);
  }
  return (
    <form
      onSubmit={(e) => {
        sendProposal(e);
        setOpen(false);
      }}
    >
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
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
      </div> */}
      <div className="flex flex-col justify-around bg-gradient-to-tr from-gray-100 to-slate-300 w-full  py-6 px-4 rounded-lg h-96">
        <h4 className="text-3xl opacity-60">Post a Job</h4>
        <div className="flex w-full flex-col mt-8 mb-10 justify-between">
          {/* <input
              className="py-2 px-5 rounded-full mb-4 focus:shadow-lg outline-none transition-shadow"
              placeholder="Subject"
              value={postDataInput.subject}
              onChange={(e) => {
                setPostDataInput({
                  ...postDataInput,
                  subject: e.target.value,
                });
              }}
            /> */}
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
        </div>
        <button
          className="select-none text-xl text-white bg-gradient-to-bl transition-all active:scale-95 outline-none active:bg-gradient-to-bl active:from-slate-500 active:to-slate-700 from-slate-500 to-slate-700 rounded-full"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default Form;

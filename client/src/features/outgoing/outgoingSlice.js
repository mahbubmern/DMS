// create slice

import { createSlice } from "@reduxjs/toolkit";
import {
  createOutgoing,
  editOutgoings,
  getOutgoings,
} from "./outgoingApiSlice";

const initialState = {
  outgoingFile: null,
  message: null,
  error: null,
  loader: false,
};

const outgoingSlice = createSlice({
  name: "outgoing",
  initialState,
  reducers: {
    setEmptyMessage: (state) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOutgoing.pending, (state) => {
        state.loader = true;
      })
      .addCase(createOutgoing.fulfilled, (state, action) => {
        state.loader = false;
        state.outgoingFile = action.payload.outgoingFile;
        state.message = action.payload.message;
      })
      .addCase(createOutgoing.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      // get All Incomings
      .addCase(getOutgoings.pending, (state) => {
        state.loader = true;
      })
      .addCase(getOutgoings.fulfilled, (state, action) => {
        state.loader = false;
        state.outgoingFile = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getOutgoings.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })

      // Update Incomings file
      .addCase(editOutgoings.pending, (state) => {
        state.loader = true;
      })
      .addCase(editOutgoings.fulfilled, (state, action) => {
        state.loader = false;
        state.outgoingFile = action.payload.outgoingFile;
        state.message = action.payload.message;
      })
      .addCase(editOutgoings.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

//selector export

export const outgoingSelector = (state) => state.outgoing;

//actions export

export const { setEmptyMessage } = outgoingSlice.actions;

//reducer export

export default outgoingSlice.reducer;

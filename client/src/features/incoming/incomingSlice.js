// create slice

import { createSlice } from "@reduxjs/toolkit";
import {
  createIncoming,
  editIncomings,
  getIncomings,
} from "./incomingApiSlice";

const initialState = {
  incomingFile: null,
  message: null,
  error: null,
  loader: false,
};

const incomingSlice = createSlice({
  name: "incoming",
  initialState,
  reducers: {
    setEmptyMessage: (state) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIncoming.pending, (state) => {
        state.loader = true;
      })
      .addCase(createIncoming.fulfilled, (state, action) => {
        state.loader = false;
        state.incomingFile = action.payload.incomingFile;
        state.message = action.payload.message;
      })
      .addCase(createIncoming.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      // get All Incomings
      .addCase(getIncomings.pending, (state) => {
        state.loader = true;
      })
      .addCase(getIncomings.fulfilled, (state, action) => {
        state.loader = false;
        state.incomingFile = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getIncomings.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })

      // Update Incomings file
      .addCase(editIncomings.pending, (state) => {
        state.loader = true;
      })
      .addCase(editIncomings.fulfilled, (state, action) => {
        state.loader = false;
        state.incomingFile = action.payload.incomingFile;
        state.message = action.payload.message;
      })
      .addCase(editIncomings.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

//selector export

export const incomingSelector = (state) => state.incoming;

//actions export

export const { setEmptyMessage } = incomingSlice.actions;

//reducer export

export default incomingSlice.reducer;

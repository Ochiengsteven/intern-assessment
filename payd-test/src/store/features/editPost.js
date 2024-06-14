// store/features/editPost.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, title, body, userId }) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, {
      title,
      body,
      userId,
    });
    return response.data;
  }
);

const editPostSlice = createSlice({
  name: "editPost",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default editPostSlice.reducer;

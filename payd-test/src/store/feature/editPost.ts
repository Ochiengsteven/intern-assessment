/* eslint-disable @typescript-eslint/no-explicit-any */
// editPost.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

// Types
interface EditPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface EditPostState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Async thunk for editing a post
export const editPost = createAsyncThunk<any, EditPost>(
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

const initialState: EditPostState = {
  status: "idle",
  error: null,
};

const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(editPost.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        // @ts-expect-error action is any
        state.error = action.error.message;
      });
  },
});

export default editPostSlice.reducer;

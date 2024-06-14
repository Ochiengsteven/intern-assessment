/* eslint-disable @typescript-eslint/no-explicit-any */
// createPost.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

// Types
interface NewPost {
  title: string;
  body: string;
  userId: number;
}

interface PostState {
  post: { title: string; body: string; userId: number } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface RejectValue {
  message: string;
}

// Async thunk for creating a post
export const createPost = createAsyncThunk<
  unknown,
  NewPost,
  { rejectValue: RejectValue }
>("posts/createPost", async (newPost, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_BASE_URL, newPost);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState: PostState = {
  post: null,
  status: "idle",
  error: null,
};

const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        // @ts-expect-error action can be a string or an object
        state.error = action.payload ? action.payload : action.error.message;
      });
  },
});

export default createPostSlice.reducer;

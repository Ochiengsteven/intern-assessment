// fetchPosts.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

// Types
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get(API_BASE_URL);
    // delay by 3s to simulate slow network
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        // @ts-expect-error action is any
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

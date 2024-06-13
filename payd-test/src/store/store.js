import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/fetchPosts";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;

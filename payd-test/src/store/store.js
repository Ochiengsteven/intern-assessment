import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/fetchPosts";
import createPostReducer from "./features/createPost";
import editPostReducer from "./features/editPost";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    createPost: createPostReducer,
    editPost: editPostReducer,
  },
});

export default store;

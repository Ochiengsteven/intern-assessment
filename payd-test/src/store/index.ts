import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./feature/counterSlice";
import postReducer from "./feature/fetchPosts";
import createPostReducer from "./feature/createPost";
import editPostReducer from "./feature/editPost";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    createPost: createPostReducer,
    editPost: editPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { fetchPosts } from "../store/feature/fetchPosts";
import { RootState } from "../store";

interface PostType {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const usePosts = (postsPerPage: number) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.posts.posts);
  const status = useAppSelector((state: RootState) => state.posts.status);
  const error = useAppSelector((state: RootState) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (post: PostType) => {
    setSelectedPost(post);
    setIsEditMode(true);
  };

  return {
    posts: currentPosts,
    status,
    error,
    currentPage,
    totalPages,
    selectedPost,
    isEditMode,
    handlePageChange,
    handleEdit,
    setIsEditMode,
  };
};

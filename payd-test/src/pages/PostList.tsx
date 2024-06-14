// PostList.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchPosts } from "../store/feature/fetchPosts";
import Post from "../components/Post";
import { Skeleton, Stack } from "@chakra-ui/react";
import { STATUS_MESSAGES } from "../utils/constants";
import Nav from "../components/Nav";
import CreatePostForm from "../components/CreatePostForm";
import { RootState } from "../store";

interface PostType {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.posts.posts);
  const status = useAppSelector((state: RootState) => state.posts.status);
  const error = useAppSelector((state: RootState) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
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

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(totalPages, 3);
    } else if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-2 py-1 rounded-full ${
            currentPage === i ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  let content;

  if (status === "loading") {
    content = (
      <div>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className="flex h-screen">
        <Nav />
        <div className="flex-grow flex flex-col items-center justify-between py-4">
          <div className="flex flex-col items-center gap-4 mb-4 overflow-auto flex-1 px-3 lg:h-[90vh] lg:pt-8">
            <div className="w-full px-3 mt-16 lg:mt-10">
              <CreatePostForm
                initialValues={selectedPost}
                isEdit={isEditMode}
                onClose={() => setIsEditMode(false)}
              />
            </div>
            {currentPosts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                onEdit={() => handleEdit(post)}
              />
            ))}
          </div>
          <div className="h-20">
            <div className="flex justify-center items-center space-x-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded-full"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 bg-gray-200 rounded-full"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <div className="flex justify-center items-center space-x-1 mt-4">
              {renderPageNumbers()}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (status === "failed") {
    content = (
      <div>
        {STATUS_MESSAGES.error}: {error}
      </div>
    );
  }

  return <section>{content}</section>;
};

export default PostsList;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/features/fetchPosts";
import Post from "../components/Post";
import { Skeleton, Stack } from "@chakra-ui/react";
import { STATUS_MESSAGES } from "../utils/constants";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <div className="h-screen flex flex-col justify-between py-4">
        <div className="flex flex-col items-center gap-4 mb-4 overflow-auto w-full lg:h-[90vh]">
          {currentPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
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

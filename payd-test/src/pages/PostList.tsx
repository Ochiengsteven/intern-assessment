// PostList.tsx
import React from "react";
import { motion } from "framer-motion";
import { usePosts } from "../hooks/postHooks";
import Post from "../components/Post";
import Nav from "../components/Nav";
import CreatePostForm from "../components/CreatePostForm";
import { STATUS_MESSAGES } from "../utils/constants";
import Loader from "../components/Loader";
import IntroText from "../components/IntroText";

const PostsList: React.FC = () => {
  const postsPerPage = 5;
  const {
    posts,
    status,
    error,
    currentPage,
    totalPages,
    selectedPost,
    isEditMode,
    handlePageChange,
    handleEdit,
    setIsEditMode,
  } = usePosts(postsPerPage);

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
    content = <Loader />;
  } else if (status === "succeeded") {
    content = (
      <div className="flex h-screen">
        <Nav />
        <div className="flex-grow flex flex-col items-center justify-between py-4">
          <div className="flex flex-col items-center gap-4 mb-4 overflow-auto flex-1 px-3 lg:h-[90vh] lg:pt-8">
            <IntroText />
            <div className="w-full px-3 mt-16 lg:mt-10">
              <CreatePostForm
                // @ts-expect-error implicitly has an 'any' type.
                initialValues={selectedPost}
                isEdit={isEditMode}
                onClose={() => setIsEditMode(false)}
              />
            </div>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <Post
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  onEdit={() => handleEdit(post)}
                />
              </motion.div>
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

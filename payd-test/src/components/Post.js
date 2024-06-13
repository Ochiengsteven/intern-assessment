import React, { useState } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import PostDetails from "./PostDetails";

const Post = ({ id, title, body }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Box
      className="bg-[#fafafb] rounded-lg shadow-md p-4 cursor-pointer"
      onClick={openModal}
      style={{ width: "90vw" }} // Set a constant width
    >
      <Text className="text-sm text-gray-600">post {id}</Text>
      <Heading size="md" className="font-semibold">
        {title}
      </Heading>

      {isModalOpen && (
        <PostDetails id={id} title={title} body={body} onClose={closeModal} />
      )}
    </Box>
  );
};

export default Post;

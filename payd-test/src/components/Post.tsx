// Post.tsx
import React, { useState } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import PostDetails from "./PostDetails";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface PostProps {
  id: number;
  title: string;
  body: string;
  onEdit: (post: { id: number; title: string; body: string }) => void;
}

const Post: React.FC<PostProps> = ({ id, title, body, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Box
      className="bg-[#fafafb] rounded-lg shadow-md p-4 cursor-pointer w-full"
      onClick={openModal}
    >
      <div className="flex items-center justify-between">
        <Text className="text-sm text-gray-600">post {id}</Text>
        <ArrowForwardIcon
          boxSize={4}
          color="gray.500"
          className="float-right"
        />
      </div>
      <Heading size="md" className="font-semibold">
        {title}
      </Heading>

      {isModalOpen && (
        <PostDetails
          id={id}
          title={title}
          body={body}
          onClose={closeModal}
          onEdit={onEdit}
        />
      )}
    </Box>
  );
};

export default Post;

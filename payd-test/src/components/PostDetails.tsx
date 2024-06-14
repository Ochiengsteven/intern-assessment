// PostDetails.tsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useBreakpointValue,
  Heading,
  Text,
} from "@chakra-ui/react";

interface PostDetailsProps {
  id: number;
  title: string;
  body: string;
  onClose: () => void;
  onEdit: (post: { id: number; title: string; body: string }) => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({
  id,
  title,
  body,
  onClose,
  onEdit,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleEditClick = () => {
    onEdit({ id, title, body });
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} size={isMobile ? "full" : "lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <p>Post {id}</p>
          <Button onClick={handleEditClick} colorScheme="teal" ml="4">
            Edit Post
          </Button>
        </ModalHeader>
        <ModalBody>
          <Heading size="lg" className="mb-4">
            {title}
          </Heading>
          <Text>{body}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="red">
            {isMobile ? "Back" : "Close"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostDetails;

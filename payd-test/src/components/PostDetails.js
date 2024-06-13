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

const PostDetails = ({ id, title, body, onClose }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Modal isOpen={true} onClose={onClose} size={isMobile ? "full" : "lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post {id}</ModalHeader>
        <ModalBody>
          <Heading size="lg" className="mb-4">
            {title}
          </Heading>
          <Text>{body}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            {isMobile ? "Back" : "Close"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostDetails;

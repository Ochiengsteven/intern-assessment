// CreatePostForm.tsx
import React from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "../hooks/formHooks";

interface CreatePostFormProps {
  initialValues?: {
    id?: number;
    userId?: number;
    title?: string;
    body?: string;
  };
  isEdit?: boolean;
  onClose?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  initialValues = {},
  isEdit = false,
  onClose: parentOnClose,
}) => {
  const {
    isOpen,
    onOpen,
    onClose,
    userId,
    setUserId,
    title,
    setTitle,
    body,
    setBody,
    handleSubmit,
  } = useForm({ initialValues, isEdit, onClose: parentOnClose });

  return (
    <>
      {!isEdit && (
        <Button
          onClick={onOpen}
          leftIcon={<AddIcon />}
          colorScheme="green"
          mb="4"
        >
          Create Post
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEdit ? "Edit Post" : "Create a new post"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              as="form"
              onSubmit={handleSubmit}
              p="4"
              bg="white"
              rounded="md"
              shadow="md"
            >
              <FormControl id="userId" isRequired>
                <FormLabel>User ID</FormLabel>
                <Input
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(Number(e.target.value))}
                />
              </FormControl>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="body" isRequired>
                <FormLabel>Body</FormLabel>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </FormControl>
              <Button type="submit" mt="4" colorScheme="teal">
                {isEdit ? "Save Changes" : "Submit"}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostForm;

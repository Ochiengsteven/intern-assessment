// CreatePostForm.tsx
import React, { useState, useEffect } from "react";
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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../hooks/reduxHooks";
import { createPost } from "../store/feature/createPost";
import { editPost } from "../store/feature/editPost";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userId, setUserId] = useState(initialValues?.userId ?? 1);
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [body, setBody] = useState(initialValues?.body ?? "");
  const [postId, setPostId] = useState(initialValues?.id ?? null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEdit && initialValues) {
      setPostId(initialValues.id);
      setUserId(initialValues.userId);
      setTitle(initialValues.title);
      setBody(initialValues.body);
      onOpen();
    }
  }, [isEdit, initialValues, onOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && postId) {
      dispatch(editPost({ id: postId, title, body, userId }));
    } else {
      dispatch(createPost({ title, body, userId }));
    }
    setUserId(1);
    setTitle("");
    setBody("");
    onClose();
    if (parentOnClose) parentOnClose();
  };

  return (
    <>
      {!isEdit && (
        <Button
          onClick={onOpen}
          leftIcon={<AddIcon />}
          colorScheme="teal"
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
                  type="text"
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
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostForm;

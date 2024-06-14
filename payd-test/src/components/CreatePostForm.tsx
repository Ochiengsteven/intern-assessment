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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
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
  const toast = useToast();

  useEffect(() => {
    if (isEdit && initialValues) {
      setPostId(initialValues.id ?? null);
      setUserId(initialValues.userId ?? 1);
      setTitle(initialValues.title ?? "");
      setBody(initialValues.body ?? "");
      onOpen();
    }
  }, [isEdit, initialValues, onOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPostId = postId ?? Math.random();

    if (isEdit && postId) {
      dispatch(editPost({ id: postId, title, body, userId }));
      toast({
        title: "Post updated.",
        description: "Your post has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // @ts-expect-error - newPostId is not a number
      dispatch(createPost({ id: newPostId, title, body, userId }));
      toast({
        title: "Post created.",
        description: "Your post has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

// hooks/formHooks.ts
import { useState, useEffect } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useAppDispatch } from "./reduxHooks";
import { createPost } from "../store/feature/createPost";
import { editPost } from "../store/feature/editPost";

interface UseFormProps {
  initialValues?: {
    id?: number;
    userId?: number;
    title?: string;
    body?: string;
  };
  isEdit?: boolean;
  onClose?: () => void;
}

export const useForm = ({
  initialValues = {},
  isEdit = false,
  onClose: parentOnClose,
}: UseFormProps) => {
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

  return {
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
  };
};

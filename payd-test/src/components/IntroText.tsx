import React from "react";
import { Heading, Text, VStack, Container } from "@chakra-ui/react";

const IntroText: React.FC = () => {
  return (
    <Container maxW="container.md" className="mt-20 lg:mt-10">
      <VStack spacing={4} textAlign="center">
        <Heading as="h1" size="xl">
          Welcome to Posts
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Dive into a world of knowledge, creativity, and conversation. Start
          creating your own posts, browse through our extensive collection, and
          connect with others today!
        </Text>
      </VStack>
    </Container>
  );
};

export default IntroText;

import { Box, SkeletonText, Skeleton } from "@chakra-ui/react";

const Loader = () => {
  return (
    <div className="mx-4 mt-20">
      <Box padding="6" boxShadow="lg" bg="white">
        <Skeleton startColor="green.500" endColor="green.100" height="20px" />
        <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="12" />
      </Box>
    </div>
  );
};

export default Loader;

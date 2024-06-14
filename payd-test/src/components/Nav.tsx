// Nav.tsx
import React, { useState } from "react";
import { Box, IconButton, Flex, useBreakpointValue } from "@chakra-ui/react";
import { HamburgerIcon, CalendarIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const toggleMenu = () => setIsOpen(!isOpen);

  const logo = "/images/logo.png";

  return (
    <>
      {isMobile ? (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="4"
          className="fixed top-0 left-0 w-full bg-white z-50"
        >
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={toggleMenu}
            variant="outline"
            aria-label="Toggle Navigation"
          />
          <img src={logo} alt="Logo" className="w-10 h-10" />
          {isOpen && (
            <MotionBox
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 w-1/2 h-full bg-white z-40"
            >
              <Box className="p-4">
                <IconButton
                  icon={<CloseIcon />}
                  onClick={toggleMenu}
                  variant="outline"
                  className="mb-4"
                  aria-label="Close Navigation"
                />
                <Flex direction="column" align="center">
                  <img src={logo} alt="Logo" className="w-10 h-10 mb-8" />
                  <Box
                    className="bg-[#19A873] text-white rounded-lg p-2 mb-4"
                    mx="4"
                    display="flex"
                    alignItems="center"
                  >
                    <CalendarIcon boxSize={4} className="mr-2" />
                    All Posts
                  </Box>
                </Flex>
              </Box>
            </MotionBox>
          )}
        </Flex>
      ) : (
        <Box className="fixed top-0 left-0 h-full w-64 bg-white p-4 z-50 shadow-xl">
          <img src={logo} alt="Logo" className="w-10 h-10 mb-8" />
          <Box
            className="bg-[#19A873] text-white rounded-lg p-2 mb-4"
            mx="4"
            display="flex"
            alignItems="center"
          >
            <CalendarIcon boxSize={4} className="mr-2" />
            All Posts
          </Box>
        </Box>
      )}
    </>
  );
};

export default Nav;

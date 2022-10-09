import { ReactNode, useState, useRef } from "react";

import {
  Box,
  Flex,
  Image,
  HStack,
  Button,
  IconButton,
  Link,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  VStack,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
} from "@chakra-ui/react";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "public/logos/Logo-Sideways-Large.svg";

import useWindowDimensions from "~/utils/hooks/useWindowDimensions";

interface NavbarProps {
  children: React.ReactNode;
}

const Links = ["Dashboard", "Projects", "Team", "About", "Services"];

const NavLinkAppbar = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const NavLinkDrawer = ({
  children,
  closeDialog,
}: {
  children: ReactNode;
  closeDialog: any;
}) => (
  <Link
    p={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.800"),
    }}
    href={"#"}
    onClick={closeDialog}
  >
    {children}
  </Link>
);

export default function Navbar({ children }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={12}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <HStack spacing="24px">
          <Image
            objectFit="contain"
            h={160}
            w={"auto"}
            src={logo}
            alt="PulseTrail-Sideways"
            draggable="false"
          />
          <HStack spacing="24px" display={{ base: "none", lg: "flex" }}>
            {Links.map((link) => (
              <NavLinkAppbar key={link}>{link}</NavLinkAppbar>
            ))}
          </HStack>
        </HStack>

        <HStack spacing="24px">
          <IconButton aria-label="Color Scheme" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          <Button
            fontSize={"sm"}
            fontWeight={400}
            display={{ base: "none", lg: "flex" }}
          >
            Sign In
          </Button>
          <Button
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
            display={{ base: "none", lg: "flex" }}
          >
            Sign Up
          </Button>

          <IconButton
            aria-label="Open Drawer"
            ref={btnRef}
            onClick={onOpen}
            display={{ lg: "none" }}
          >
            <HamburgerIcon />
          </IconButton>
        </HStack>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing="24px" align="stretch">
              {Links.map((link) => (
                <NavLinkDrawer key={link} closeDialog={onClose}>
                  {link}
                </NavLinkDrawer>
              ))}
            </VStack>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
      {children}
    </Box>
  );
}

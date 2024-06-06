import React from "react";
import CreateUserModal from "./CreateUserModal";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxH={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <img src="/react.png" alt="React logo" width={40} height={45} />
            <Text fontSize={"40px"}>+</Text>
            <img src="/python.png" alt="Python logo" width={40} height={45} />
            <Text fontSize={"40px"}>=</Text>
            <img src="/explode.png" alt="Explode logo" width={40} height={45} />
          </Flex>
          <Flex alignItems={"center"} gap={3}>
            <Text
              fontSize={"lg"}
              fontWeight={500}
              display={{ base: "none", md: "flex" }}
            >
              BFFship 🔥
            </Text>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
            <CreateUserModal />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;

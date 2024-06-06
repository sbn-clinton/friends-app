import { Container, Stack, Text } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";

function App() {
  return (
    <Stack minH={"100vh"}>
      <Navbar />
      <Container maxW={"1200px"} my={"4px"}>
        <Text
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
          fontSize={{ base: "3xl", md: "50" }}
        >
          <Text
            as={"span"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            My Besties
          </Text>
          🚀
        </Text>
        <UserGrid />
      </Container>
    </Stack>
  );
}

export default App;

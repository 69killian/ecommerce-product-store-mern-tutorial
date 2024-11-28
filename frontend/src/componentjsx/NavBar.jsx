import { Container, Flex, Text, Link, Button, } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import { useColorMode } from "../components/ui/color-mode";


const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
        >

        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, #00B5D8, #3182CE)"
          bgClip="text"
        >
          <Link as={RouterLink} to="/">Product Store 🛒</Link>
        </Text>


        <HStack spacing={2} alignItems={"center"}>
          <Link as={RouterLink} to={"/create"}>
            <Button>
            <CiSquarePlus fontSize={"20"}/>
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun size="20"/>}
          </Button>
        </HStack>

      </Flex>
    </Container>
  )
}

export default NavBar
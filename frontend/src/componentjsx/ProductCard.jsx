
import { Box, Image, Heading, Text, HStack, Button } from "@chakra-ui/react";
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useColorModeValue } from "../components/ui/color-mode";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
  return (
    <>
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      mb={4} // Adds space between cards
      ml={4}
      mr={4}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
      </Box>

      <HStack spacing={2}>
        {/* Edit Button */}
        <Button
          colorScheme="green"
          variant="outline"
          borderColor="green.700"
          bg="transparent"
          _hover={{
            bg: "green.300",
            borderColor: "green.600",
          }}
          size="lg"
        >
          <FaRegEdit color="green" />
        </Button>

        {/* Delete Button */}
        <Button
          colorScheme="red"
          variant="outline"
          borderColor="red.700"
          bg="transparent"
          _hover={{
            bg: "red.100",
            borderColor: "red.600",
          }}
          size="lg"
        >
          <MdDelete color="red" />
        </Button>
      </HStack>
    </Box>
    </>
  )
}

export default ProductCard
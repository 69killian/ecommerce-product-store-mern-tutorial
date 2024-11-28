import { Input, Box, Stack, Text, Button } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { useColorMode } from "../components/ui/color-mode";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";


const CreatePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const [newProduct, setNewProduct] = useState({
    name:'',
    price: '',
    image: '',
  });

  const {createProduct} = useProductStore();


  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
  
    if (!success) {
      toast.error(message || "An error occurred while creating the product.", {
        duration: 4000,
        position: "top-right",
        style: {
          backgroundColor: "#880808",
          color: "red", // Texte blanc
          fontWeight: "bold", // Texte en gras
        },
      });
      return;
    }
  
    toast.success(message || "The product has been successfully created.", {
      duration: 4000,
      position: "top-right",
      style: {
        backgroundColor: "0f430f",
        color: "green", // Texte blanc
        fontWeight: "bold", // Texte en gras
      },
    });
  
    // Réinitialiser les champs après succès
    setNewProduct({ name: "", price: "", image: "" });
  };
  

  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg={colorMode === "dark" ? "gray.800" : "gray.100"} // Change background based on colorMode
      color={colorMode === "dark" ? "white" : "black"} // Change text color based on colorMode
      padding="4"
    >
      <Stack
        spacing="6"
        width="100%"
        maxWidth="600px" // Increased width for larger form
        bg={colorMode === "dark" ? "gray.700" : "white"} // Form background color
        padding="6"
        borderRadius="md"
        boxShadow="md"
        align="center"
      >
        {/* Title */}
        <Text
          fontSize="5xl" // Increased title size for better visibility
          fontWeight="bold"
          textAlign="center"
          color={colorMode === "dark" ? "white" : "black"}
          marginBottom="8" // Space below the title
        >
          Create Product
        </Text>

        <Field>
          <Stack spacing="6" width="100%">
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
              bg={colorMode === "dark" ? "gray.600" : "gray.50"}
              color={colorMode === "dark" ? "white" : "black"}
              height="60px" // Increased height for the input fields
              borderRadius="md"
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
              bg={colorMode === "dark" ? "gray.600" : "gray.50"}
              color={colorMode === "dark" ? "white" : "black"}
              height="60px" // Increased height for the input fields
              borderRadius="md"
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
              bg={colorMode === "dark" ? "gray.600" : "gray.50"}
              color={colorMode === "dark" ? "white" : "black"}
              height="60px" // Increased height for the input fields
              borderRadius="md"
            />

            <Button colorScheme="blue" onClick={handleAddProduct} 
            w="full" bg={colorMode === "dark" ? "gray.600" : "gray.50"}
              color={colorMode === "dark" ? "white" : "black"}>
                Add Product
            </Button>
          </Stack>
        </Field>
      </Stack>
    </Box>
    <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default CreatePage;

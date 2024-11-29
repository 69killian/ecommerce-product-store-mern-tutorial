
import { Box, Image, Heading, Text, HStack, Button, VStack, Input } from "@chakra-ui/react";
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from '@chakra-ui/modal';

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const { deleteProduct, updateProduct } = useProductStore();
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
      
        if (success) {
          // Toast d'erreur
          toast.error(message || "An error occurred while deleting the product.", {
            duration: 4000,
            position: "top-right",
            style: {
              backgroundColor: "#880808", // Fond rouge pour les erreurs
              color: "red", // Texte blanc
              fontWeight: "bold", // Texte en gras
            },
          });
          return;
        } else {
          // Toast de succès
          toast.success(message || "The product has been successfully deleted.", {
            duration: 4000,
            position: "top-right",
            style: {
              backgroundColor: "#0f430f", // Fond vert pour succès
              color: "green", // Texte blanc
              fontWeight: "bold", // Texte en gras
            }
          });
          const { fetchProducts } = useProductStore.getState(); // Accès direct au store Zustand
          await fetchProducts();
        }
      };




      const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        closeModal();
        if (success) {
            // Toast d'erreur
            toast.error(message || "An error occurred while updating the product.", {
              duration: 4000,
              position: "top-right",
              style: {
                backgroundColor: "#880808", // Fond rouge pour les erreurs
                color: "red", // Texte blanc
                fontWeight: "bold", // Texte en gras
              },
            });
            return;
          } else {
            // Toast de succès
            toast.success(message || "The product has been successfully updated.", {
              duration: 4000,
              position: "top-right",
              style: {
                backgroundColor: "#0f430f", // Fond vert pour succès
                color: "green", // Texte blanc
                fontWeight: "bold", // Texte en gras
              }
            });
            const { fetchProducts } = useProductStore.getState(); // Accès direct au store Zustand
            await fetchProducts();
          }
      }
      
      
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
      cursor="pointer"
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
        <Button onClick={openModal}
          colorScheme="green"
          variant="outline"
          borderColor="green.700"
          bg="transparent"
          _hover={{
            bg: "green.300",
            borderColor: "green.600",
          }}
          size="lg"
          cursor="pointer"
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
          cursor="pointer"
          onClick={() => handleDeleteProduct(product._id)}
        >
          <MdDelete color="red" />
        </Button>
      </HStack>
    </Box>

    <Modal isOpen={isModalOpen} onClose={closeModal}>
  <ModalOverlay
    display="flex !important" 
    alignItems="center" 
    justifyContent="center" 
  />
  <ModalContent
    maxWidth="400px" 
    borderRadius="md" 
    bg={useColorModeValue("#f4f4f5", "#18181b")} 
    p={4} 
    boxShadow="lg" 
    position="absolute"
    top="50%"
    left="40%"
    border={`1px solid ${useColorModeValue("#ccc", "#555")}`}
    borderRadius="5px"
  >
    <ModalHeader
      textAlign="center"
      fontWeight="bold"
      fontSize="lg"
      color={useColorModeValue("black", "white")} 
    >
      Update Product
    </ModalHeader>
    <ModalBody>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Product Name"
          name="name"
          value={updatedProduct.name}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, name: e.target.value })
          }
          focusBorderColor="blue.400" 
        />
        <Input
          placeholder="Price"
          name="price"
          type="number"
          value={updatedProduct.price}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, price: e.target.value })
          }
          focusBorderColor="blue.400"
        />
        <Input
          placeholder="Image URL"
          name="image"
          value={updatedProduct.image}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, image: e.target.value })
          }
          focusBorderColor="blue.400"
        />
      </VStack>
    </ModalBody>

    <ModalFooter justify="center">
      <Button
        colorScheme="blue"
        mr={3}
        onClick={() => {
          handleUpdateProduct(product._id, updatedProduct);
          closeModal();
        }}
      >
        Update
      </Button>
      <Button variant="ghost" onClick={closeModal}>
        Cancel
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    

    <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default ProductCard
import { Container, VStack, Text, Link, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../componentjsx/ProductCard.jsx";

const HomePage = () => {

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products", products);
  
  return (
    <>
    <Container maxW='container.x1' py={12}>
        <VStack spacing={8}>
            <Text
              fontSize="5xl"
              fontWeight="bold"
              color="green.500"
              textAlign="center"
            >
              Current Products 🚀
            </Text>

              <SimpleGrid 
                columns={{
                  base:1,
                  md:2,
                  lg:3
                }}
                spacing={10}
                w={"full"}
              >
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product}/>
                    ))}
              </SimpleGrid>

            {products.length === 0 && (
              <Text fontSize="x1" textAlign={"center"} fontWeight="bold" color="gray.500">
              No products found 😭 {" "}
              <Link as={RouterLink} to={"/create"}>
                  <Text color="green.500" _hover={{textDecoration: "underline"}}>
                      Create a product
                  </Text>
              </Link>
          </Text>
            )}
        </VStack>
      </Container>
    </>
  )
}

export default HomePage
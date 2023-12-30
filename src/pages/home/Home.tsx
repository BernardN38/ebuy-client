import { useEffect } from "react";
import { Box } from "@mui/material";
import FreeSolo from "../../shared/search/Search";
import {
  // HealthCheckResponse,
  ProductCreationResponse,
  ProductPayload,
  ProductServiceAPI,
} from "../../backendApi/productServiceApi";
import { AxiosError } from "axios";

function Home() {
  console.count("useEffect in Home component");
  useEffect(() => {
    const productService = ProductServiceAPI.getInstance(
      "http://localhost:8080"
    );
    const payload: ProductPayload = {
      name: "test react",
      description: "test description react",
      price: 300,
    };
    // Make a call to check health
    productService
      .createProduct(payload)
      .then((response: ProductCreationResponse) => {
        console.log("Health Check Response:", response);
      })
      .catch((error: AxiosError) => {
        console.log("Error checking health:", error.response);
      });
  }, []);
  return (
    <Box paddingY={1} width={"100%"}>
      <FreeSolo />
    </Box>
  );
}

export default Home;

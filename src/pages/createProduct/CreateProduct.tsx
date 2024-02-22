import React, { useState, ChangeEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Input,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import ProductServiceAPI, {
  ProductPayload,
} from "../../backendApi/productServiceApi";
import MediaServiceAPI from "../../backendApi/mediaServiceApi";

interface FormData {
  name: string;
  description: string;
  price: number;
  productType: string;
}

function CreateProduct() {
  const [productTypes, setProductTypes] = useState<String[]>([""]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    productType: "",
  });
  const productServiceApi: ProductServiceAPI = ProductServiceAPI.getInstance();
  const mediaServiceapi: MediaServiceAPI = MediaServiceAPI.getInstance();
  useEffect(() => {
    productServiceApi
      .getProductTypes()
      .then((resp) => {
        setProductTypes(resp.productTypes);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (selectedFile === null) {
      return;
    }

    try {
      const startTime = performance.now(); // Capture start time

      const mediaResp = await mediaServiceapi.uploadMedia(selectedFile);

      const productPayload: ProductPayload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        productType: formData.productType,
        mediaId: mediaResp.mediaId,
      };

      await productServiceApi.createProduct(productPayload);

      const endTime = performance.now(); // Capture end time
      const elapsedTime = endTime - startTime; // Calculate elapsed time

      console.log(`Form submission took ${elapsedTime} milliseconds`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement;
    // Assuming `formData` is a state variable
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: 2,
          px: 1,
        }}
      >
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        <InputLabel id="productType-label">Product Type</InputLabel>
        <Select
          labelId="productType-label"
          id="productType"
          name="productType"
          value={formData.productType} // Set value prop to formData.productType
          onChange={handleChange}
        >
          {productTypes.map((v, i) => {
            return (
              <MenuItem key={i} value={String(v)}>
                {v}
              </MenuItem>
            ); // Add value prop to MenuItem
          })}
        </Select>

        {/* <InputLabel htmlFor="mediaId">Upload Image</InputLabel> */}
        <Input
          type="file"
          id="media"
          name="media"
          onChange={handleFileChange}
          sx={{ display: "none" }} // Hide the default input
        />
        <label htmlFor="media">
          <Button variant="contained" component="span" fullWidth>
            Choose Image
          </Button>
        </label>

        <Button
          onClick={handleSubmit}
          variant="contained"
          type="submit"
          color="success"
        >
          Create Product
        </Button>
      </Box>
    </form>
  );
}

export default CreateProduct;

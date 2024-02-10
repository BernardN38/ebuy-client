import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Search } from "@mui/icons-material";
import { Button, Box } from "@mui/material";
import { Product } from "../../backendApi/productServiceApi";

interface Props {
  products: Array<Product>;
}

export default function FreeSolo(props: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearch = () => {
    if (selectedProduct) {
      console.log("Selected Product ID:", selectedProduct.id);
      // You can perform further actions here based on the selected product ID
    }
  };

  return (
    <Box
      sx={{
        height: "4rem",
        paddingX: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingY: "1rem",
          height: "90%",
        }}
      >
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          fullWidth
          options={props.products || []}
          value={selectedProduct}
          onChange={(event, newValue) => {
            // Ensure newValue is of type Product | null
            setSelectedProduct(newValue as Product | null);
          }}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          renderInput={(params) => (
            <TextField {...params} label="Search Ebuy" />
          )}
        />

        <Button
          onClick={handleSearch}
          color="primary"
          variant="contained"
          sx={{ height: "100%" }}
        >
          <Search />
        </Button>
      </Box>
    </Box>
  );
}

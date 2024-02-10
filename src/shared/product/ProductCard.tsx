import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Product } from "../../backendApi/productServiceApi";
import { serverUrl } from "../../config";
import { Box, Button } from "@mui/material";
interface ProductProps {
  product: Product;
}
const ProductCard = (props: ProductProps) => {
  return (
    <Card>
      <img
        src={
          props.product.mediaId
            ? `${serverUrl}/api/v1/media/${props.product.mediaId}`
            : ""
        }
        // alt={name}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" component="div">
            {props.product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Price: ${props.product.price / 100}
          </Typography>
        </Box>
        <Box>
          <Button color="success" variant="contained">
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

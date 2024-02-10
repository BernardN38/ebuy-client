import { Box } from "@mui/material";
import { Product } from "../../backendApi/productServiceApi";
import ProductCard from "../product/ProductCard";
interface RecentProductProps {
  products: Array<Product>;
}
function RecentProducts(props: RecentProductProps) {
  return (
    <Box>
      {props.products != null
        ? props.products.map((v, i) => {
            return (
              <Box key={i} sx={{ py: 0.5 }}>
                <ProductCard product={v} />
              </Box>
            );
          })
        : ""}
    </Box>
  );
}

export default RecentProducts;

import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <Box width={"100vw"}>
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default Layout;

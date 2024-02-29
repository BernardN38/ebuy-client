import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import React from "react";
function Layout() {
  return (
    <Box width={"100%"} margin={0}>
      <Navbar />
      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </Box>
  );
}

export default Layout;

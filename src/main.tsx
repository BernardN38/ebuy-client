import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home/Home";
import Layout from "./shared/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/login/Login";
import CreateProduct from "./pages/createProduct/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/products/create", element: <CreateProduct /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

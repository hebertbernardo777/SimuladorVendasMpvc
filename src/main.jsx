import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import Error from "../src/routes/Error.jsx";
import NewOrdes from "./pages/newordes/NewOrdes.jsx";
import CategoryProdutcs from "./pages/produtcs/categoryProducts/CategoryProducts.jsx";
import Products from "./pages/produtcs/products/Products.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/orders",
    element: <NewOrdes />,
  },
  {
    path: "/categories",
    element: <CategoryProdutcs/>
  },
  {
    path: "/product",
    element: <Products/>

  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


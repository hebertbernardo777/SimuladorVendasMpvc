import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import Error from "../src/routes/Error.jsx";
import NewOrders from "./pages/newordes/NewOrdes.jsx";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts.jsx";
import Products from "./pages/produtcs/Products.jsx";
import Login from "./pages/login/Login.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Card from "./components/Card/Card.jsx";
import { CalculationContextProvider } from "./context/CalculationContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/orders",
        element: <NewOrders />,
      },
      {
        path: "/categories",
        element: <CategoryProducts />,
      },
      {
        path: "/product",
        element: <Products />,
      },
      // {
      //   path: "/clients",
      //   element: <Card />,
      // },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <CalculationContextProvider> */}
        <RouterProvider router={router} />
      {/* </CalculationContextProvider> */}
    </AuthContextProvider>
  </React.StrictMode>
);

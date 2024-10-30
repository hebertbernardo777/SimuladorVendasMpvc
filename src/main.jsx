import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import { DataContextProvider } from "./context/DataContext.jsx";
import Error from "../src/routes/Error.jsx";
import Login from "./pages/login/Login.jsx";
import Clients from "./pages/Clients/Clients.jsx";
import FormMultistep from "./pages/FormMultstep/FormMultistep.jsx";
import NewOrders from "./pages/neworders/NewOrders.jsx";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts.jsx";
import Products from "./pages/produtcs/Products.jsx";
import Drafts from "./pages/Draftss/Drafts.jsx";
import Summary from "./pages/summary/Summary.jsx";
import "./index.css";
import ResumeDrafts from "./pages/Draftss/ResumeDrafts.jsx";
import { AuthContextProvider } from "./context/AuthContex.jsx";
import { ProductContextProvider } from "../src/context/ProductContext.jsx";
import { PrivateRoute } from "./routes/privateRoutes.jsx";
import { ResumeContextProvider } from "./context/ResumeContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          // <PrivateRoute>
          <FormMultistep />
          // </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          // <PrivateRoute>
          <NewOrders />
          // </PrivateRoute>
        ),
      },
      {
        path: "/category",
        element: (
          //  <PrivateRoute>
          <CategoryProducts />
          //  </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: (
          // <PrivateRoute>
          <Products />
          //  </PrivateRoute>
        ),
      },
      {
        path: "/clients",
        element: (
          //  <PrivateRoute>
          <Clients />
          //  </PrivateRoute>
        ),
      },
      {
        path: "/drafts",
        element: (
          //    <PrivateRoute>
          <Drafts />
          //  </PrivateRoute>
        ),
      },
      {
        path: "/resumedrafts/:id",
        element: (
          // <PrivateRoute>
          <ResumeDrafts />
          //  </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          //  <PrivateRoute>
          <Summary />
          //   </PrivateRoute>
        ),
      },
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
      <DataContextProvider>
        <ProductContextProvider>
          <ResumeContextProvider>
            <RouterProvider router={router} />
          </ResumeContextProvider>
        </ProductContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Error from "../src/routes/Error.jsx";
import Login from "./pages/login/Login.jsx";
import Clients from "./pages/Clients/Clients.jsx";
import FormMultistep from "./pages/FormMultstep/FormMultistep.jsx";
import NewOrdes from "./pages/newordes/NewOrdes.jsx";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts.jsx";
import Products from "./pages/produtcs/Products.jsx";
import Drafts from "./pages/Draftss/Drafts.jsx";
import Summary from "./pages/summary/Summary.jsx";
import "./index.css";
import ResumeDrafts from "./pages/Draftss/ResumeDrafts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <FormMultistep />,
      },
      {
        path: "/orders",
        element: <NewOrdes />,
      },
      {
        path: "/category",
        element: <CategoryProducts />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/drafts",
        element: <Drafts />,
      },
      {
        path: "/resumedrafts",
        element: <ResumeDrafts />,
      },
      {
        path: "/cart",
        element: <Summary />,
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
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

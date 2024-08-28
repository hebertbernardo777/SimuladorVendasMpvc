import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import Error from "../src/routes/Error.jsx";

import Login from "./pages/login/Login.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Clients from "./pages/Clients/Clients.jsx";
import FormMultistep from "./pages/FormMultstep/FormMultistep.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
     errorElement: <Error />,
  },
      {
        path: "/orders",
        element: <FormMultistep/>
      },
         {
        path: "/clients",
        element: <Clients/>
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

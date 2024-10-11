import { createContext, useState, useEffect } from "react";
import useCalcProducts from "../hooks/useCalcProducts";

export const OiContext = createContext();

export const  OiContextProvider = ({ children }) => {

const {posts} = useCalcProducts()
const products = posts.rows || [];

console.log(products)

  return <OiContext.Provider value={{products}}>{children}</OiContext.Provider>;
};

import { createContext, useState } from "react";
import useCalcProducts from "../hooks/useCalcProducts";

export const ResumeContext = createContext();

export const ResumeContextProvider = ({ children }) => {
  const [discountResults, setDiscountResults] = useState({});

  const { totalValueItem } = useCalcProducts();

  const value = {
    totalValueItem,
    discountResults,
    setDiscountResults,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

import { createContext, useState } from "react";
import useCalcProducts from "../hooks/useCalcProducts";

export const ResumeContext = createContext();

export const ResumeContextProvider = ({ children }) => {
  const [discountResults, setDiscountResults] = useState({});
  const [totalComFrete, setTotalComFrete] = useState(0);
  const { totalValueItem } = useCalcProducts();

  const value = {
    totalValueItem,
    discountResults,
    setDiscountResults,
    totalComFrete,
    setTotalComFrete,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

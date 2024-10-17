import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [productPrice, setProductPrice] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const value = {
    posts,
    setPosts,
    selectedProductData,
    setSelectedProductData,
    productPrice,
    setProductPrice,
    quantity,
    setQuantity,
    discount,
    setDiscount,
    discountApplied,
    setDiscountApplied,
    totalPrice,
    setTotalPrice,
    orderTotal,
    setOrderTotal,
    imagePath,
    setImagePath,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

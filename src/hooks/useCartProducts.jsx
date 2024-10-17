import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { ProductContext } from "../context/ProductContext";

const useCartProducts = () => {
  const { selectedProduct, cartItems, setCartItems } = useContext(DataContext);

  const {
    quantity,
    imagePath,
    orderTotal,
    productPrice,
    discountApplied,
    totalPrice,
    selectedProductData,
  } = useContext(ProductContext);
  console.log(selectedProductData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct || !selectedProductData) {
      navigate("/category");
    }
  }, [selectedProduct, selectedProductData, navigate]);

  const productId = selectedProductData ? selectedProductData.CODPROD : null;
  const categoryProduct = selectedProductData
    ? selectedProductData.AD_SUBGRUPO
    : null;

  const newItem = {
    productId: productId,
    category: categoryProduct,
    name: selectedProduct,
    price: productPrice,
    quantity: quantity,
    discountTotal: discountApplied,
    image: imagePath,
    priceTotal: totalPrice, //sem desconto
    totalOrders: orderTotal, //com desconto
    line: selectedProductData ? selectedProductData.AD_LINHAPRODUTOS : null,
  };

  console.log(newItem);

  const handleFocus = (e) => {
    e.target.value = "";
  };

  const handleAddCart = () => {
    // Verifica se o item já está no carrinho
    const itemsExists = cartItems.some(
      (item) => item.productId === selectedProductData.CODPROD
    );
    // Adiciona o novo item ao carrinho temporariamente
    if (!itemsExists) {
      // Atualiza o novo item com o desconto calculado
      const updatedNewItem = {
        ...newItem,
      };

      // Atualiza o estado do carrinho com o novo item
      setCartItems((prevItems) => {
        // Filtra itens existentes para garantir que não haja duplicatas
        const existingItems = prevItems.filter(
          (item) => item.productId !== updatedNewItem.productId
        );
        return [...existingItems, updatedNewItem];
      });
    } else {
      // Alerta caso o item já esteja no carrinho
      alert("Este item já foi adicionado ao carrinho");
    }
  };

  return {
    handleFocus,
    handleAddCart,
  };
};

export default useCartProducts;

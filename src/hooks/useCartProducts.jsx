import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useCartProducts = () => {
  const {
    selectedProduct,
    product,
    imagePath,
    cartItems,
    setCartItems,
    productPrice,
    quantity,
    totalValueItem,
    orderTotal,
    discountApplied,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct || !product) {
      navigate("/category");
    }
  }, [selectedProduct, product, navigate]);

  const productId = product ? product.CODPROD : null;
  const categoryProduct = product ? product.AD_SUBGRUPO : null;

  const newItem = {
    productId: productId,
    category: categoryProduct,
    name: selectedProduct,
    price: productPrice,
    quantity: quantity,
    discountTotal: discountApplied,
    image: imagePath,
    priceTotal: totalValueItem,
    totalOrders: orderTotal,
    line: product ? product.AD_LINHAPRODUTOS : null,
  };

  const handleFocus = (e) => {
    e.target.value = "";
  };

  const handleAddCart = () => {
    // Verifica se o item já está no carrinho
    const itemsExists = cartItems.some(
      (item) => item.productId === product.CODPROD
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

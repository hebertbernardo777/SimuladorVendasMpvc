import { useState, useEffect, useContext } from "react";
import { api } from "../lib/products";
import { DataContext } from "../context/DataContext";
import { ProductContext } from "../context/ProductContext";

const useCalcProducts = () => {
  const {
    posts,
    setPosts,
    setSelectedProductData,
    productPrice,
    setProductPrice,
    quantity,
    setQuantity,
    discount,
    setDiscount,
    discountApplied,
    setDiscountApplied,
    setTotalPrice,
    orderTotal,
    setOrderTotal,
    setImagePath,
  } = useContext(ProductContext);

  const {
    data,
    loading,
    setLoading,
    selectedProduct,
    selectedClient,
    discountAPR,
    discountREP,
    selectedNegociacao,
  } = useContext(DataContext);

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.toJSON());
        setLoading(false);
      });
  }, []);

  const suframa = data.suframa;
  const products = posts.rows || [];
  const product = products.find((p) => p.DESCRPROD === selectedProduct);

  useEffect(() => {
    if (product) {
      setSelectedProductData(product);
    }
  }, [product, setSelectedProductData]);

  const calculateProductPrice = () => {
    if (selectedClient) {
      const suframaListado = selectedClient.GRUPOICMS;
      const ufSuframa = selectedClient.UF;
      const estadosAmazonia = ["AM", "AC", "AP", "RR", "RO"];

      if (ufSuframa === "GO") {
        return product.VLRVENDA;
      }

      if (estadosAmazonia.includes(ufSuframa)) {
        switch (suframaListado) {
          case 102:
            return product.AD_VLRISENTOTODOSIMP;
          case 103:
            return product.AD_ISENTOICMSIPI;
          case 101:
            return product.AD_VLRISENTOIPI;
          default:
            return product.VLRVENDA;
        }
      }

      return product.AD_VLRINTERESTADUAL;
    } else {
      switch (suframa) {
        case "Não optante":
          return product.AD_VLRINTERESTADUAL;
        case "isento-todos":
          return product.AD_VLRISENTOTODOSIMP;
        case "isento-ICMSIPI":
          return product.AD_ISENTOICMSIPI;
        case "isento-IPI":
          return product.AD_VLRISENTOIPI;
        default:
          return product.VLRVENDA;
      }
    }
  };


  useEffect(() => {
    if (product) {
      const calculatedPrice = calculateProductPrice();
      console.log("Preço calculado sem descontos:", calculatedPrice);

      let discount = 0;
      if (data.faturamento === "2") {
        discount = calculatedPrice * (discountREP / 100);
      } else if (data.faturamento === "3" || data.faturamento === "4") {
        discount = calculatedPrice * (discountAPR / 100);
      }

      console.log("Desconto baseado no faturamento:", discount);

      const percentMKT = selectedNegociacao
        ? selectedNegociacao.AD_PERCPMKTAB
        : 0;
        console.log(selectedNegociacao)
      console.log("Percentual de desconto da negociação:", percentMKT);

      const additionalDiscountNegociacao = calculatedPrice * (percentMKT / 100);
      console.log(
        "Desconto adicional baseado na negociação:",
        additionalDiscountNegociacao
      );

      const finalPrice =
        calculatedPrice - discount - additionalDiscountNegociacao;
      console.log("Preço final com descontos aplicados:", finalPrice);

      setProductPrice(finalPrice);
    } else {
      setProductPrice(0);
    }
  }, [
    product,
    suframa,
    selectedClient,
    data.faturamento,
    discountAPR,
    discountREP,
    selectedNegociacao,
  ]);

  console.log(productPrice);

  // cálculo de quantidade
  const quantidadeMininia = product?.AD_QTDPC || 0;
  useEffect(() => {
    if (product) {
      setQuantity(quantidadeMininia); // Inicializa a quantidade com a quantidade mínima do produto
    }
  }, [product, quantidadeMininia, setQuantity]);

  const minusQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - quantidadeMininia);
    }
  };
  const plusQuantity = () => {
    setQuantity(product["AD_QTDPC"] + quantity);
  };

  // cálculo desconto
  const adjustDecimal = (value) => {
    return Math.round(value * 10) / 10;
  };

  const plusDiscount = () => {
    const numericDiscount = parseFloat(discount);
    setDiscount(adjustDecimal(numericDiscount + 1));
  };
  const minusDiscount = () => {
    const numericDiscount = parseFloat(discount);

    if (numericDiscount > 0) {
      setDiscount(adjustDecimal(numericDiscount - 1));
    }
  };

  //valor total do pedido sem desconto
  const totalValueItem = productPrice * quantity;

  // valor do pedido com desconto
  const calculateOrderTotalDiscount = () => {
    const discountApplied = (totalValueItem * parseFloat(discount)) / 100; //valor total do pedido * o desconto valor do desconto
    const orderTotal = totalValueItem - discountApplied; //valor total com desconto

    setTotalPrice(totalValueItem);
    setDiscountApplied(discountApplied);
    setOrderTotal(orderTotal);
  };

  useEffect(() => {
    calculateOrderTotalDiscount();
  }, [calculateOrderTotalDiscount]);

  // armazena desconto % por produto
  const totalDiscountApllied = (discountApplied / totalValueItem) * 100;

  useEffect(() => {
    if (product && product.AD_IMGAPP) {
      const path = `/src/assets/ImageProducts/${product.AD_IMGAPP}.png`;
      setImagePath(path);
    }
  }, [product]);

  return {
    posts,
    loading, // Retornando o estado de loading
    products,
    product,
    productPrice,
    quantity,
    minusQuantity,
    minusDiscount,
    plusQuantity,
    plusDiscount,
    totalValueItem,
    discountApplied,
    orderTotal,
    totalDiscountApllied,
  };
};

export default useCalcProducts;

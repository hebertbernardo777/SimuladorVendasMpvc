import { useState, useEffect, useContext } from "react";
import { api } from "../lib/products";
import { DataContext } from "../context/DataContext";
import { ProductContext } from "../context/ProductContext";

const useCalcProducts = () => {
  const {
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
    setTotalPrice,
    setImagePath,
    priceInitial,
    setPriceInitial,
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
    valueST,
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
  console.log(selectedProductData);

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
      let calculatedPrice = calculateProductPrice(); // Calcula o preço inicial

      // Verifica se o produto pertence ao grupo 40200
      if (product.CODGRUPOPROD === 40200) {
        const largura = product.LARGURA;
        const altura = product.ALTURA;

        // Verifica se largura e altura estão definidas
        if (largura && altura) {
          const area = altura * largura; // Calcula a área
          const priceForro = calculatedPrice / area; // Calcula o preço por metro quadrado

          // Atribui o valor de priceForro ao calculatedPrice
          calculatedPrice = priceForro;
        } else {
          console.log("Largura ou altura não disponíveis para o cálculo.");
        }
      }

      let discount = 0;
      if (data.faturamento === "2") {
        discount = calculatedPrice * (discountREP / 100);
      } else if (data.faturamento === "3" || data.faturamento === "4") {
        discount = calculatedPrice * (discountAPR / 100);
      }

      const percentMKT = selectedNegociacao
        ? selectedNegociacao.AD_PERCPMKTAB
        : 0;
      const additionalDiscountNegociacao = calculatedPrice * (percentMKT / 100);
      const finalPrice =
        calculatedPrice - discount - additionalDiscountNegociacao;

      setProductPrice(finalPrice);
      setPriceInitial(finalPrice);
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

  // cálculo de quantidade
  const quantidadeMininia = product?.AD_QTDPC || 0;
  useEffect(() => {
    if (product) {
      if (product.CODGRUPOPROD === 40200) {
        const largura = product.LARGURA;
        const altura = product.ALTURA;

        if (largura && altura) {
          const area = altura * largura;
          const quantityForro = quantidadeMininia * area;
          setQuantity(quantityForro);
        }
      } else {
        setQuantity(quantidadeMininia); // Inicializa a quantidade com a quantidade mínima do produto
      }
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

  const adjustDecimal = (value) => {
    return Math.round(value * 100) / 100;
  };

  const handleDiscountChange = (e) => {
    let value = parseFloat(e.target.value) || 0;
    value = Math.max(0, Math.min(100, adjustDecimal(value))); // Garante valores entre 0 e 100
    setDiscount(value);
    updatePriceWithDiscount(value);
  };
  
  const plusDiscount = () => {
    setDiscount((prevDiscount) => {
      const newDiscount = Math.min(100, adjustDecimal(prevDiscount + 1)); // Incrementa até no máximo 100
      updatePriceWithDiscount(newDiscount);
      return newDiscount;
    });
  };
  
  const minusDiscount = () => {
    setDiscount((prevDiscount) => {
      const newDiscount = Math.max(0, adjustDecimal(prevDiscount - 1)); // Não permite valores negativos
      updatePriceWithDiscount(newDiscount);
      return newDiscount;
    });
  };
  
  const plusPrice = () => {
    setProductPrice((prevPrice) => {
      const newPrice = adjustDecimal(prevPrice + 1); // Incrementa em 1 unidade
      calculateDiscountedPrice(newPrice);
      return newPrice;
    });
  };
  
  const minusPrice = () => {
    setProductPrice((prevPrice) => {
      const newPrice = adjustDecimal(Math.max(1, prevPrice - 1)); // Evita preços menores que 1
      calculateDiscountedPrice(newPrice);
      return newPrice;
    });
  };
  
  const calculateDiscountedPrice = (updatedPrice) => {
    if (priceInitial > 0) {
      const calculatedDiscount = ((priceInitial - updatedPrice) / priceInitial) * 100;
      const newDiscount = adjustDecimal(Math.max(0, Math.min(100, calculatedDiscount))); // Garante valores válidos
      setDiscount(newDiscount);
    }
  };
  
  const updatePriceWithDiscount = (newDiscount) => {
    const discountedPrice = priceInitial * (1 - newDiscount / 100);
    const newPrice = adjustDecimal(Math.max(0, discountedPrice)); // Garante que o preço não fique negativo
    setProductPrice(newPrice);
  };
  
  //valor total do pedido sem desconto
  let totalValueItem;

  console.log("value no cal", productPrice);

  if (data.consultarST === true) {
    totalValueItem = (productPrice + valueST) * quantity;
  } else {
    totalValueItem = productPrice * quantity;
  }
  console.log(discount);

  // valor do pedido com desconto
  const calculateOrderTotalDiscount = () => {
    const totalPriceWithoutDiscount = priceInitial * quantity;
    const discountApplied =
      (totalPriceWithoutDiscount * parseFloat(discount)) / 100; //valor total do pedido * o desconto valor do desconto
    console.log(discountApplied);

    setTotalPrice(totalPriceWithoutDiscount);
    setDiscountApplied(discountApplied);
  };

  useEffect(() => {
    calculateOrderTotalDiscount();
  }, [calculateOrderTotalDiscount]);

  // armazena desconto % por produto
  const totalDiscountApllied = (discountApplied / totalValueItem) * 100;
  console.log(totalDiscountApllied);
  useEffect(() => {
    if (product && product.AD_IMGAPP) {
      const path = `./ImageProducts/${product.AD_IMGAPP}.png`;
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
    minusPrice,
    plusPrice,
    totalValueItem,
    discountApplied,
    totalDiscountApllied,
    handleDiscountChange,
  };
};

export default useCalcProducts;

import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { api } from "../lib/rotas";
import { ProductContext } from "../context/ProductContext";

const useRotas = () => {
  const {
    data,
    posts,
    setPosts,
    loading,
    setLoading,
    selectedClient,
    selectedProduct,
    frete,
    setFrete,
  } = useContext(DataContext);

  const { selectedProductData } = useContext(ProductContext);

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.ToJSON());
        setLoading(false);
      });
  }, []);

  if (loading) return <p>carregando</p>;

  console.log(posts);

  const percenteFrete = () => {
    if (data.frete !== "F") {
      return 0;
    }
    const rotaClient = selectedClient.CODROTA;
    if (!rotaClient) {
      return 0; // Se a rota não for encontrada, retorna 0
    }

    const codProduct = selectedProductData.CODPROD;
    const transportadoraFrete = data.transportadora;

    if (transportadoraFrete === "N") {
      return percFreteNegociado;
    } else if (transportadoraFrete === "R" || transportadoraFrete === "O") {
      return 0;
    }

    const productTanque = [12917, 12918, 502700, 505000, 507500, 510000];
    if (productTanque.includes(codProduct)) {
      switch (codProduct) {
        case 12917:
          return rotaParceiro.AD_TANQUE500 || 0; // Retorna o valor para AD_TANQUE500
        case 12918:
          return rotaParceiro.AD_TANQUE1000 || 0; // Retorna o valor para AD_TANQUE1000
        case 502700:
          return rotaParceiro.AD_TANQUE2700 || 0; // Retorna o valor para AD_TANQUE2700
        case 505000:
          return rotaParceiro.AD_TANQUE5000 || 0; // Retorna o valor para AD_TANQUE5000
        case 507500:
          return rotaParceiro.AD_TANQUE7500 || 0; // Retorna o valor para AD_TANQUE7500
        case 510000:
          return rotaParceiro.AD_TANQUE10000 || 0; // Retorna o valor para AD_TANQUE10000
        default:
          break;
      }
    }

    const item = tabela.find((item) => item.CODPROD === codProduct);
    if (item?.CODGRUPOPROD === 41900) {
      return rotaClient.AD_PERC_FRETE_CAIXA_TANQUE || 0; // Para o grupo 41900
    } else {
      return rotaClient.AD_PERC_FRETE || 0; // Para outros produtos
    }

    console.log(rotaClient);
    console.log(selectedProductData);
    console.log(codProduct);
  };

  return {};
};

export default useRotas;

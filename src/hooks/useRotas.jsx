import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { api } from "../lib/rotas";
import { ProductContext } from "../context/ProductContext";
import formatCurrency from "../utils/formatCurrency";

const useRotas = () => {
  const [posts, setPosts] = useState([]);
  const { selectedProductData } = useContext(ProductContext);
  const {
    data,
    loading,
    setLoading,
    selectedClient,
    cartItems,
    setFretePercente,
    setFreteTotal,
    freteSelected,
  } = useContext(DataContext);

  // Carrega posts da API
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

  const percenteFrete = () => {
    const rotas = posts.rows || [];
    const rotaClient = selectedClient ? selectedClient.CODROTA : null;
    const codProduct = selectedProductData.CODPROD;
    const transportadoraFrete = data.transportadora;

    const rotaParceiro = rotas.find(
      (rota) => rota.CODROTA === Number(rotaClient)
    );

    if (
      data.frete !== "F" ||
      !rotaClient ||
      !rotaParceiro ||
      ["N", "R", "O"].includes(transportadoraFrete)
    ) {
      return 0;
    }

    const item = rotas.find((item) => item.CODPROD === codProduct);

    const productTanque = [12917, 12918, 502700, 505000, 507500, 510000];
    if (productTanque.includes(codProduct)) {
      switch (codProduct) {
        case 12917:
          return rotaParceiro.AD_TANQUE500 || 0;
        case 12918:
          return rotaParceiro.AD_TANQUE1000 || 0;
        case 502700:
          return rotaParceiro.AD_TANQUE2700 || 0;
        case 505000:
          return rotaParceiro.AD_TANQUE5000 || 0;
        case 507500:
          return rotaParceiro.AD_TANQUE7500 || 0;
        case 510000:
          return rotaParceiro.AD_TANQUE10000 || 0;
        default:
          console.log("Produto não encontrado no switch:", codProduct);
          break;
      }
    }

    if (item?.CODGRUPOPROD === 41900) {
      return rotaParceiro.AD_PERC_FRETE_CAIXA_TANQUE || 0;
    } else {
      return rotaParceiro.AD_PERC_FRETE || 0;
    }
  };

  // Calcula o percentual de frete quando as dependências mudam
  useEffect(() => {
    const calcFrete = percenteFrete();
    setFretePercente(calcFrete);
  }, [selectedClient, selectedProductData, posts, cartItems]);

  // Calcula o total do frete sempre que `cartItems`, `freteSelected`, ou `data.transportadora` mudam
  useEffect(() => {
    const totalFrete = cartItems.reduce(
      (acc, item) => acc + (item.totalOrders * item.freteProduct) / 100,
      0
    );

    if (
      freteSelected === null ||
      freteSelected === undefined ||
      freteSelected === ""
    ) {
      setFreteTotal(formatCurrency(totalFrete, "BRL"));
    } else {
      setFreteTotal(freteSelected);
    }
  }, [cartItems, freteSelected, setFreteTotal, data.transportadora]);

  return {
    percenteFrete,
  };
};
  
export default useRotas;

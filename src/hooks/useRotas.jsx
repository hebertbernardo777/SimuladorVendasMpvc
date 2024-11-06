import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { api } from "../lib/rotas";
import { ProductContext } from "../context/ProductContext";

const useRotas = () => {
  const {
    data,
    loading,
    setLoading,
    selectedClient,
    cartItems,
    fretePercente,
    setFretePercente,
    freteTotal,
    setFreteTotal,
  } = useContext(DataContext);
  const { selectedProductData } = useContext(ProductContext);
  const [posts, setPosts] = useState([]);

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
    const rotaClient = selectedClient.CODROTA;
    console.log(rotaClient);
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
      console.log("sem frete");
      return 0;
    }

    const item = rotas.find((item) => item.CODPROD === codProduct);

    const productTanque = [12917, 12918, 502700, 505000, 507500, 510000];
    if (productTanque.includes(codProduct)) {
      switch (codProduct) {
        case 12917:
          const tanque500 = rotaParceiro.AD_TANQUE500 || 0;
          return tanque500;

        case 12918:
          const tanque1000 = rotaParceiro.AD_TANQUE1000 || 0;
          return tanque1000;

        case 502700:
          const tanque2700 = rotaParceiro.AD_TANQUE2700 || 0;
          return tanque2700;

        case 505000:
          const tanque5000 = rotaParceiro.AD_TANQUE5000 || 0;
          return tanque5000;

        case 507500:
          const tanque7500 = rotaParceiro.AD_TANQUE7500 || 0;
          return tanque7500;

        case 510000:
          const tanque10000 = rotaParceiro.AD_TANQUE10000 || 0;
          return tanque10000;

        default:
          console.log("Produto não encontrado no switch:", codProduct);
          break;
      }
    }

    if (item?.CODGRUPOPROD === 41900) {
      return rotaParceiro.AD_PERC_FRETE_CAIXA_TANQUE || 0;
    } else {
      console.log("caiu aqui");
      return rotaParceiro.AD_PERC_FRETE || 0;
    }
  };

  useEffect(() => {
    const calcFrete = percenteFrete();
    setFretePercente(calcFrete);

    if (cartItems.length) { // Recalcula o frete quando `cartItems` é alterado
      const total = cartItems.reduce(
        (acc, item) => acc + (item.totalOrders * item.freteProduct) / 100,
        0
      );
      setFreteTotal(total);
    } else {
      setFreteTotal(0); // Zera o frete quando o carrinho está vazio
    }
  }, [selectedClient, selectedProductData, posts, cartItems]);

  // Verifica o valor atualizado de freteTotal
  useEffect(() => {
    console.log("Frete Total", freteTotal);
  }, [freteTotal]);

  return {
    percenteFrete,
    freteTotal,
  };
};

export default useRotas;

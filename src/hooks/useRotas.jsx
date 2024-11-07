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
    fretePercente,
    setFretePercente,
    setFreteTotal,
    freteSelected,
    freteTotal,
  } = useContext(DataContext);

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
      return rotaParceiro.AD_PERC_FRETE || 0;
    }
  };

  useEffect(() => {
    const calcFrete = percenteFrete();
    setFretePercente(calcFrete);
  }, [selectedClient, selectedProductData, posts, cartItems]);

  useEffect(() => {
    // Calcula o frete total baseado nos itens do carrinho
    const totalFrete = cartItems.reduce(
      (acc, item) => acc + (item.totalOrders * item.freteProduct) / 100,
      0
    );
    // Atualiza o valor do frete final com base nas condições
    if (!freteSelected) {
      setFreteTotal(formatCurrency(totalFrete, "BRL"));
    } else {
      setFreteTotal(freteSelected);
    }
  }, [cartItems, freteSelected, fretePercente]);

  console.log("deu", freteTotal);

  return {
    percenteFrete,
  };
};

export default useRotas;

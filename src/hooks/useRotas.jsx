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
    freteSelected,
    setFreteSelected,
    freteTotal,
    setFreteTotal,
    freteAtual,
    setFreteAtual,
    isFreteTotal,
    setIsFreteTotal,
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
    console.log("Estado de posts ao chamar percenteFrete:", posts); // Adicione esta linha

    const rotas = posts.rows || [];
    console.log("Rotas:", rotas);

    if (data.frete !== "F") {
      console.log("sem frete");

      return 0;
    }
    console.log(selectedClient);
    const rotaClient = selectedClient.CODROTA;

    console.log(rotaClient);
    if (!rotaClient) {
      return 0; // Se a rota não for encontrada, retorna 0
    }

    const rotaParceiro = rotas.find(
      (rota) => rota.CODROTA === Number(rotaClient)
    );
    if (!rotaParceiro) {
      return 0;
    }
    const codProduct = selectedProductData.CODPROD;
    console.log(selectedProductData);
    console.log(codProduct);

    const transportadoraFrete = data.transportadora;

    if (transportadoraFrete === "N") {
      return percFreteNegociado;
    } else if (transportadoraFrete === "R" || transportadoraFrete === "O") {
      console.log("R ou O ");
      return 0;
    }

    const item = rotas.find((item) => item.CODPROD === codProduct);

    const productTanque = [12917, 12918, 502700, 505000, 507500, 510000];
    if (productTanque.includes(codProduct)) {
      console.log("Produto é um tanque:", codProduct); // Log do produto que está sendo verificado

      switch (codProduct) {
        case 12917:
          const tanque500 = rotaParceiro.AD_TANQUE500 || 0; // Retorna o valor para AD_TANQUE500
          console.log("Retornando AD_TANQUE500:", tanque500);
          return tanque500;

        case 12918:
          const tanque1000 = rotaParceiro.AD_TANQUE1000 || 0; // Retorna o valor para AD_TANQUE1000
          console.log("Retornando AD_TANQUE1000:", tanque1000);
          return tanque1000;

        case 502700:
          const tanque2700 = rotaParceiro.AD_TANQUE2700 || 0; // Retorna o valor para AD_TANQUE2700
          console.log("Retornando AD_TANQUE2700:", tanque2700);
          return tanque2700;

        case 505000:
          const tanque5000 = rotaParceiro.AD_TANQUE5000 || 0; // Retorna o valor para AD_TANQUE5000
          console.log("Retornando AD_TANQUE5000:", tanque5000);
          return tanque5000;

        case 507500:
          const tanque7500 = rotaParceiro.AD_TANQUE7500 || 0; // Retorna o valor para AD_TANQUE7500
          console.log("Retornando AD_TANQUE7500:", tanque7500);
          return tanque7500;

        case 510000:
          const tanque10000 = rotaParceiro.AD_TANQUE10000 || 0; // Retorna o valor para AD_TANQUE10000
          console.log("Retornando AD_TANQUE10000:", tanque10000);
          return tanque10000;

        default:
          console.log("Produto não encontrado no switch:", codProduct); // Log para caso de produto não encontrado
          break;
      }
    }

    if (item?.CODGRUPOPROD === 41900) {
      return rotaParceiro.AD_PERC_FRETE_CAIXA_TANQUE || 0; // Para o grupo 41900
    } else {
      console.log("caiu aqui");
      return rotaParceiro.AD_PERC_FRETE || 0; // Para outros produtos
    }
  };

  useEffect(() => {
    // if (freteTotal === null) {
    //   setIsFreteTotal(false);
    //   return; // Não recalcula se estiver nulo
    // }

    // ele foi selecionado
    setIsFreteTotal(true);

    const calcFrete = percenteFrete();
    setFretePercente(calcFrete);
    console.log("Frete Percentual:", fretePercente);

    if (cartItems.length) {
      setFreteTotal(() => {
        const total = cartItems.reduce(
          (acc, item) => acc + (item.totalOrders * item.freteProduct) / 100,
          0
        );
        console.log("Calculando frete total:", total);
        return total;
      });
    }
  }, [selectedClient, selectedProductData, posts, cartItems, freteTotal]);

  // Verifica o valor atualizado de freteTotal
  useEffect(() => {
    console.log("Frete Total", freteTotal);
  }, [freteTotal]);

  const atualizarFreteAtual = () => {
    // Verifique se o `freteSelected` está ativo
    debugger;
    if (isFreteTotal) {
      setFreteAtual(freteTotal);
    }
    // Se o `freteSelected` não estiver ativo, use `freteTotal`
    else {
      setFreteAtual(freteSelected);
    }
    // Se nenhum dos dois estiver ativo, defina como vazio ou zero
    // else {
    //   setFreteAtual(0);
    // }

    console.log("Frete Selected:", freteSelected);
    console.log("Frete Total:", freteTotal);
    console.log("Frete Atual:", freteAtual); // Verificação final do valor exibido
  };

  // Chama a função sempre que freteSelected ou freteTotal mudar
  useEffect(() => {
    debugger
    atualizarFreteAtual();
  }, [freteSelected, freteTotal]);
  const oi = atualizarFreteAtual();

  return {
    percenteFrete,
    freteTotal,
  };
};

export default useRotas;

import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import useOrders from "./useOrders";
import useCalcProducts from "./useCalcProducts";
import { ProductContext } from "../context/ProductContext";

const useConsultaST = () => {
  const { selectedProductData, productPrice } = useContext(ProductContext);
  const { data, cartItems, selectedClient, valueST, setValueST } =
    useContext(DataContext);
  const { posts, loading } = useOrders();

  const calcConsultaST = () => {
    let totalCMS = 0;

    if (data.consultarST !== true) {
      setValueST(0);
      return 0;
    }

    if (data.consultarST === true) {
      if (data.consultaST === true) return;
      const productNCM = selectedProductData.NCM;
      const UFClient = selectedClient.UF || "";
      const tabelaST = posts?.tabelaST || [];

      const getItemsByNCM = tabelaST.filter((item) => item.NCM === productNCM);
      const itemsWithUF = getItemsByNCM.filter((item) => item.UF === UFClient);
      const tiposCliente = [
        ...new Set(itemsWithUF.map((item) => item.TIPOCLIENTE)),
      ];

      if (
        !productNCM ||
        !UFClient ||
        ["3", "4"].includes(data.fatutamento) ||
        UFClient === "GO"
      ) {
        return 0;
      }

      if (itemsWithUF.length === 1) {
        for (const item of itemsWithUF) {
          const vlrCMSInterno = (item.ALIQINT / 100) * productPrice;
          const baseAliqExterna = productPrice * (1 + item.MVA / 100);
          const vrlCMSDestino = (item.ALIQDEST / 100) * baseAliqExterna;
          const calTotalCMS = vrlCMSDestino - vlrCMSInterno;
          totalCMS = calTotalCMS;

          setValueST(parseFloat(totalCMS.toFixed(2)));
        }
      } else if (itemsWithUF.length > 1) {
        const tipoOpcoes = data.selectOpcoes;

        // Verifica se deve usar o tipo "D"
        const deveUsarD =
          tipoOpcoes === "D" ||
          !itemsWithUF.some(
            (item) => item.TIPOCLIENTE === "A" || item.TIPOCLIENTE === "S"
          );

        // Define o tipo a ser usado no cálculo
        const tipoParaCalculo = deveUsarD ? "D" : tipoOpcoes;

        // Filtra os itens pelo tipo selecionado para o cálculo
        const itensFiltrados = itemsWithUF.filter(
          (item) => item.TIPOCLIENTE === tipoParaCalculo
        );

        for (const item of itensFiltrados) {
          const vlrCMSInterno = (item.ALIQINT / 100) * productPrice;
          const baseAliqExterna = productPrice * (1 + item.MVA / 100);
          const vrlCMSDestino = (item.ALIQDEST / 100) * baseAliqExterna;
          const calTotalCMS = vrlCMSDestino - vlrCMSInterno;
          totalCMS = calTotalCMS;
          console.log(totalCMS);
        }
        setValueST(parseFloat(totalCMS.toFixed(2)));
        return totalCMS;
      }
    }
  };

  useEffect(() => {
    if (!loading && posts) {
      calcConsultaST();
    } else {
      console.log("erro");
    }
  }, [posts, loading, selectedClient, selectedProductData, productPrice]);

  const totalValueST = cartItems.reduce(
    (acc, item) => (item.consultarST * item.quantity || 0) + acc,
    0
  );

  console.log(totalValueST);

  return {
    calcConsultaST,
    totalValueST,
  };
};

export default useConsultaST;

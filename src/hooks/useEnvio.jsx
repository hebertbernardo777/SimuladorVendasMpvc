import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { api } from "../lib/inserirpedido";
import { apiItens } from "../lib/inseriritenspedido";
import useSummary from "./useSummary";

const useEnvio = () => {
  const [nunota, setNunota] = useState(null); // Define nunota como estado
  const { data, selectedClient, cartItems } = useContext(DataContext);
  const codVend = parseInt(localStorage.getItem("CODVEND"), 10);
  const { calcDiscountTotalOrdersResume, totalValueDiscount } = useSummary();

  const faturamento = data.faturamento;
  const freteFBO = data.frete;
  const transportadora = data.transportadora;
  const codParceiro = selectedClient?.CODPARC || [];
  const observacao = data.observacoes;
  const negociacao = data.negociacao;

  const type = () => {
    if (data.tipoVenda === "1000 - Orcamento") {
      return 1000;
    }
    if (["493", "950"].includes(negociacao)) {
      return 1051;
    } else {
      return 1001;
    }
  };

  const dataSend = {
    AD_TIPOFATURAMENTO: faturamento,
    CODTIPOPER: type(),
    CODPARC: codParceiro,
    CIF_FOB: freteFBO,
    AD_TRANSPORTADORA: transportadora,
    CODVEND: codVend,
    AD_OBSTMK: observacao,
    CODTIPVENDA: parseInt(negociacao, 10),
    AD_PERCDESCONTO: calcDiscountTotalOrdersResume, // Enviar um número em vez de uma string
    AD_VLRDESCONTO: totalValueDiscount, // Enviar um número em vez de uma string
  };

  const handleEnvio = () => {
       api
      .post("/", dataSend)
      .then((response) => {
        const nunotaResponse = response.data.outBinds?.nunota?.[0];
        if (nunotaResponse) {
          setNunota(nunotaResponse);
          sendItems(nunotaResponse); // Envia os itens após obter o NUNOTA
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar pedido:", error);
      });
  };

  const sendItems = (nunota) => {
    const itemsOrders = cartItems
      .map((item, index) => {
        const product = item.product;
        if (!product) return null;

        const m2 = product.LARGURA * product.ALTURA;
        const QTDPADRAO =
          product.CODGRUPOPROD === 40200 ? item.quantity * m2 : item.quantity;
        const VLRPADRAO =
          product.CODGRUPOPROD === 40200 ? item.price * m2 : item.price;
        const VLRTABELAPADRAO =
          product.CODGRUPOPROD === 40200
            ? item.priceTable * m2
            : item.priceTable;

        const DESCONTOPADRAO = (VLRPADRAO / VLRTABELAPADRAO) * 100;
        const AD_VLRDESCONTO =
          VLRTABELAPADRAO * QTDPADRAO * (DESCONTOPADRAO / 100);

        return {
          CODPROD: product.CODPROD,
          CODTAB: product.CODTAB,
          NUNOTA: nunota,
          QTDNEG: QTDPADRAO,
          SEQUENCIA: index + 1,
          VLRTOT: item.price * QTDPADRAO,
          VLRUNIT: VLRPADRAO,
          CODVEND: codVend,
          CODVOL: product.CODVOL,
          AD_VLRTABELAAPP: VLRTABELAPADRAO,
          PRECOBASE: VLRTABELAPADRAO,
          AD_DESCONTO: DESCONTOPADRAO,
          AD_VLRDESCONTO: AD_VLRDESCONTO,
        };
      })
      .filter(Boolean);

    apiItens
      .post("/", itemsOrders)
      .then((response) => {
        alert("Pedido enviado com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao enviar itens:", error);
      });
  };

  return { nunota, handleEnvio };
};

export default useEnvio;

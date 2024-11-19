import React, { useContext, useEffect, useState } from "react";
import { api } from "../lib/inserirpedido";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContex";
import { ProductContext } from "../context/ProductContext";
import useCalcProducts from "./useCalcProducts";

const useEnvio = () => {
  const [nunota, setNunota] = useState(null); // Define nunota como estado
  const { data, selectedClient, cartItems } = useContext(DataContext);
  const codVend = parseInt(localStorage.getItem("CODVEND"), 10);

  const faturamento = data.faturamento;
  const freteFBO = data.frete;
  const transportadora = data.transportadora;
  const codParceiro = selectedClient.CODPARC;
  const observacao = data.observacoes;
  const negociacao = data.negociacao;

  const type = () => {
    if (data.tipoVenda === "orcamento") {
      console.log("esse");
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
    AD_PERCDESCONTO: 10, // Enviar um número em vez de uma string
    AD_VLRDESCONTO: 100, // Enviar um número em vez de uma string
  };

  const handleEnvio = () => {
    console.log("Iniciando envio de pedido...");
    api
      .post("/", dataSend)
      .then((response) => {
        const nunotaResponse = response.data.outBinds?.nunota?.[0];
        if (nunotaResponse) {
          setNunota(nunotaResponse);
          console.log("NUNOTA recebido:", nunotaResponse);
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

    console.log("Itens enviados:", itemsOrders);

    api
      .post("/", { items: itemsOrders })
      .then((response) => {
        console.log("Resposta da API:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar itens:", error);
      });
  };

  return { nunota, handleEnvio };
};

export default useEnvio;

// async function enviaPedido(){
//     // VALIDAR DADOS ANTES

//     // ------- CAB ---------//

//     const AD_TIPOFATURAMENTO = params?.tiposFaturamento?.find( item => item.OPCAO === tipoFaturamento)?.VALOR ;
//     const CIF_FOB = params?.tipoFrete?.find( item => item.OPCAO === tipoFrete )?.VALOR;
//     const AD_TRANSPORTADORA = params?.transportadoras?.find( item => item.OPCAO === transportadoraFrete)?.VALOR;
//     const CODTIPOPER = top();
//     const CODPARC = parceiro?.CODPARC;
//     const CODVEND = authContext?.user?.CODVEND;
//     const AD_OBSTMK = obs;
//     const CODTIPVENDA = tipoNegociacao?.CODTIPVENDA;
//     //const AD_VLRFRETE = vlrTotalFrete;
//     const AD_MARGEMDESCONTOGERAL = 0 //calcPercMargemSimuladorGeral(0,0,0);
//     const AD_DESCONTOGERALAPP = PercDescontoTotalPedido();
//     var NUNOTA = 0;

//     const dataSend = {
//         AD_TIPOFATURAMENTO: AD_TIPOFATURAMENTO,
//         CODTIPOPER: CODTIPOPER,
//         CODPARC: CODPARC,
//         CIF_FOB: CIF_FOB,
//         AD_TRANSPORTADORA: AD_TRANSPORTADORA,
//         CODVEND: CODVEND,
//         AD_OBSTMK: AD_OBSTMK,
//         CODTIPVENDA: CODTIPVENDA,
//         //AD_MARGEMDESCONTOGERAL: AD_MARGEMDESCONTOGERAL,
//         //AD_DESCONTOGERALAPP: 0,// AD_DESCONTOGERALAPP,
//         AD_PERCDESCONTO: AD_DESCONTOGERALAPP, //AD_DESCONTOGERALAPP,
//         AD_VLRDESCONTO:  produtos.reduce( (acc,value) => acc + (value?.VLRTABELA*value.QTDNEG),0)*AD_DESCONTOGERALAPP/100
//     }

//     if(!dataSend.AD_TIPOFATURAMENTO){

//         throw new Error('Preencher Tipo de Faturamento!')
//     }

//     if((params.transportadoras.findIndex( item => item.VALOR === dataSend.AD_TRANSPORTADORA) === -1)){

//         throw new Error('Preencher a transportadora!')
//     }

//     if(!dataSend.CIF_FOB){

//         throw new Error('Preencher modalidade do frete CIF/FOB!')
//     }

//     if(!dataSend.CODPARC){

//         throw new Error('Preencher Parceiro/Cliente')
//     }
//     if(dataSend.CODPARC === 0){

//         throw new Error('Parceiro sem Cadastro somente aceita salvar rascunho!')
//     }

//     if(!dataSend.CODTIPVENDA){

//         throw new Error('Preencher tipo de negociação!')
//     }

//     if(produtos.length === 0){

//         throw new Error('Adicionar Produtos ao pedido!')
//     }

//     produtos.map( item =>  {

//         if(item.QTDNEG <= 0){
//             alert('Produto com quantidade incorreta : ' + item?.CODPROD + '-' + item.DESCRPROD)
//             throw new Error('Produto com quantidade incorreta :')
//         }
//         if(item.VLRUNIT <=0){
//             alert('Produto com valor incorreto : ' + item?.CODPROD + '-' + item.DESCRPROD)
//             throw new Error('Produto com valor incorreto :')
//         }
//     })

//     const itensPedido = produtos.map( item => {
//         return item;
//     })

//     await api.post('/inserirpedido',dataSend).then( (response) => {
//         NUNOTA = response.data.outBinds?.nunota[0]CODPROD:

//         const itens:SendItensProps[] = []

//         itensPedido.map( (prod,index) => {

//         const produto = tabela.find( tabela => tabela?.CODPROD === prod?.CODPROD);
//         const m2 = produto?.ALTURA*produto?.LARGURA;

//         const QTDPADRAO = produto?.CODGRUPOPROD === 40200 ? prod.QTDNEG/m2 : prod.QTDNEG;
//         const VLRPADRAO = produto?.CODGRUPOPROD === 40200 ? prod.VLRUNIT*m2 : prod.VLRUNIT;
//         const VLRTABELAPADRAO = produto?.CODGRUPOPROD === 40200 ? prod.VLRTABELA*m2 : prod.VLRTABELA;
//         const DESCONTOPADRAO = (VLRPADRAO/VLRTABELAPADRAO)*100;

//         const item:SendItensProps = {
//             CODPROD: prod.CODPROD,
//             CODTAB: prod.CODTAB,
//             NUNOTA: NUNOTA,
//             QTDNEG: QTDPADRAO,
//             SEQUENCIA: index+1,
//             VLRTOT: (prod.VLRUNIT*prod.QTDNEG),
//             VLRUNIT: VLRPADRAO,
//             CODVEND: authContext?.user?.CODVEND,
//             CODVOL: prod.CODVOL,
//             AD_VLRTABELAAPP: VLRTABELAPADRAO,
//             PRECOBASE : VLRTABELAPADRAO,
//             AD_DESCONTO: DESCONTOPADRAO,
//             AD_VLRDESCONTO: (VLRTABELAPADRAO*QTDPADRAO)*(DESCONTOPADRAO/100),
//         }

//         itens.push(item)

//         })

//         api.post('/inseriritenspedido',itens).then( (res) => console.log('itens inseridos!'))

//     }).then( () => alert('Pedido Enviado!')).then( () => limparPedido())

// }

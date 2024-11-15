import React, { useContext, useEffect, useState } from "react";
import { api } from "../lib/inserirpedido";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContex";
import { ProductContext } from "../context/ProductContext";
import useCalcProducts from "./useCalcProducts";

const useEnvio = () => {
  const [nunota, setNunota] = useState(null); // Define nunota como estado
  const { data, selectedClient, cartItems } = useContext(DataContext);
  const { product } = useCalcProducts();

  const codVend = parseInt(localStorage.getItem("CODVEND"), 10);
  console.log(codVend);

  const faturamento = data.faturamento;
  const freteFBO = data.frete;
  const transportadora = data.transportadora;
  const codParceiro = selectedClient.CODPARC;
  const observacao = data.observacoes;
  const negociacao = data.negociacao;
  // let nunota = 0;

  const type = () => {
    if (data.tipoVenda === "orcamento") {
      console.log("esse");
      return 1000;
    }
    if (["493", "950"].includes(negociacao)) {
      console.log("aqui");
      return 1051;
    } else {
      console.log("oi");
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

  useEffect(() => {
    api
      .post("/", dataSend) // Envia o payload na requisição
      .then((response) => {
        const nunotaResponse = response.data.outBinds?.nunota[0];
        if (nunotaResponse) {
          setNunota(nunotaResponse); // Atualiza o estado nunota
          console.log("NUNOTA recebido da API:", nunotaResponse);
        } else {
          console.log("Nunota não encontrado");
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar pedido:", error);
      });
    console.log("Payload a ser enviado:", dataSend);
  }, []);

  useEffect(() => {
    if (cartItems && cartItems.length > 0 && nunota) {
      // Verifica se os itens do carrinho e nunota estão disponíveis
      console.log("Carrinho carregado:", cartItems);
      console.log("NUNOTA antes de enviar itens:", nunota);
      sendItems(nunota); // Envia os itens depois que cartItems e nunota estão disponíveis
    } else {
      console.log("Ainda não temos carrinho ou NUNOTA para enviar.");
    }
  }, [cartItems, nunota]); // Executa quando cartItems ou nunota mudar

  const sendItems = (nunota) => {
    const itemsOrders = cartItems.map((item, index) => {
      // Verifique se 'product' existe e contém os dados necessários
      const product = item.product;
      if (!product) {
        console.warn("Produto não definido para o item:", item);
        return null; // Pula este item caso 'product' esteja indefinido
      }

      // Cálculo de m2 e outras variáveis baseadas em 'product'
      const m2 = product.LARGURA * product.ALTURA;
      const QTDPADRAO =
        product.CODGRUPOPROD === 40200 ? item.quantity * m2 : item.quantity;
      const VLRPADRAO =
        product.CODGRUPOPROD === 40200 ? item.price * m2 : item.price;
        console.log("VLRPADRAO",VLRPADRAO)
      const VLRTABELAPADRAO =
        product.CODGRUPOPROD === 40200 ? item.priceTable * m2 : item.priceTable;
        console.log("VLRTABELAPADRAO", VLRTABELAPADRAO)
      const DESCONTOPADRAO = (VLRPADRAO / VLRTABELAPADRAO) * 100;
      const AD_VLRDESCONTO =
        VLRTABELAPADRAO * QTDPADRAO * (DESCONTOPADRAO / 100);
      // debugger
      return {
        CODPROD: product.CODPROD, // Acessando a propriedade CODPROD
        CODTAB: product.CODTAB,
        NUNOTA: nunota,
        QTDNEG: QTDPADRAO, // Quantidade do produto ajustada
        SEQUENCIA: index + 1,
        VLRTOT: item.price * QTDPADRAO, // Valor total calculado
        VLRUNIT: VLRPADRAO, // Valor unitário ajustado
        CODVEND: codVend, // Código do vendedor
        CODVOL: product.CODVOL,
        AD_VLRTABELAAPP: VLRTABELAPADRAO, // Valor da tabela
        PRECOBASE: VLRTABELAPADRAO,
        AD_DESCONTO: DESCONTOPADRAO, // Percentual de desconto
        AD_VLRDESCONTO: AD_VLRDESCONTO, // Valor de desconto aplicado
      };
    });

    // Remova itens nulos antes de enviar para a API
    // const validItemsOrders = itemsOrders.filter(Boolean);

    console.log("Itens a serem enviados:", itemsOrders);

    // Envia os dados para a API
    api
      .post("/", { items: itemsOrders })
      .then((response) => {
        console.log("Resposta da API:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar pedido:", error);
      });
  };

  // sendItems();

  return <div>useEnvio</div>;
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
//         NUNOTA = response.data.outBinds?.nunota[0]

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

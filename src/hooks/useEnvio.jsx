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
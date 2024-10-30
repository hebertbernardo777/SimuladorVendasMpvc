import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import useOrders from "./useOrders";
import useCalcProducts from "./useCalcProducts";
import { ProductContext } from "../context/ProductContext";

const useConsultaST = () => {
  const { selectedProductData } = useContext(ProductContext);
  const { data, selectedClient } = useContext(DataContext);
  const { posts } = useOrders();

  const calcConsultaST = () => {
    console.log(posts);
    console.log(selectedProductData);
    console.log(selectedClient);

    const productNCM = selectedProductData.NCM;
    const UFClient = selectedClient.UF;
    const faturamento = data.faturamento;
    const tabelaST = posts?.tabelaST || [];
    
    const getItemsByNCM = tabelaST.filter((item)=> item.NCM === productNCM)
    console.log(getItemsByNCM)
    
    const itemsWithUF = getItemsByNCM.filter((item)=> item.UF === UFClient)
    console.log(UFClient , itemsWithUF)
    
    // Verifica se existe algum item no array antes de acessar
if (itemsWithUF.length > 0) {
    const tipoClient = itemsWithUF[0].TIPOCLIENTE;
    console.log("TIPOCLIENTE:", tipoClient);
    console.log("UF:", itemsWithUF[0].UF);
} else {
    console.log("Nenhum item encontrado com o UF e NCM especificados.");
}

    // console.log(NCM, UFClient, faturamento, tabelaST);
    // if (!NCM || !UFClient ||  ) {
    //   return 0;
    // }

    

    if (
      data.fatutamento === "3" ||
      data.fatutamento === "4" ||
      UFClient === "GO"
    )
      return 0;
  };

//   if(getItemsByNCM && itemsWithUF){

//   }

  return {
    calcConsultaST,
  };
};

export default useConsultaST;

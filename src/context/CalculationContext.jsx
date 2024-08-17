import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CalculationContext = createContext()

export const CalculationContextProvider =({Children})=>{
    const { data, product} = useContext(AuthContext);
    const suframa = data.suframa;
   const [productPrice, setProductPrice]= useState(0)

    // const getProductPrice = () => {
    //     switch (suframa) {
    //       case "Não optante":
    //         return product.AD_VLRINTERESTADUAL;
    //       case "isento-todos":
    //         return product.AD_VLRISENTOTODOSIMP;
    //       case "isento-ICMSIPI":
    //         return product.AD_ISENTOICMSIPI;
    //       case "isento-IPI":
    //         return product.AD_VLRISENTOIPI;
    //       default:
    //         return product.VLRVENDA;
    //     }
    //   };
    //   const price = getProductPrice();

      console.log(product)

    return(
        <CalculationContext.Provider value={{data, product}}>
            {Children}
        </CalculationContext.Provider>
    )
}
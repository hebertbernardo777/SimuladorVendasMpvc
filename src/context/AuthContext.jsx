import { createContext, useState, useEffect } from "react";
import DataProducts from "./../data/produtcs.json";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [data, setData] = useState({
    tipoVenda: "",
    faturamento: "",
    frete: "",
    transportadora: "",
    negociacao: "",
    valorFinal: "",
    freteNegociado: "",
    consultarST: "",
    observacoes: "",
    search: "",
    customerRegistration: "",
    namePartners: "",
    typePartners: "",
    ufPartners: "",
    suframa: "",
    searchProduct: "",
    category: "",
    product: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [products] = useState(DataProducts.rows);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [letterInitial, setLetterInitial] = useState("");
  const product = products.find((p) => p.DESCRPROD === selectedProduct);

  useEffect(() => {
    if (product && product.AD_IMGAPP) {
      const path = `/src/assets/ImageProducts/${product.AD_IMGAPP}.png`;
      setImagePath(path);
    }
  }, [product]);

  return (
    <AuthContext.Provider
      value={{
        data,
        setData,
        currentStep,
        setCurrentStep,
        products,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        imagePath,
        product,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//70520541162
//11752082133

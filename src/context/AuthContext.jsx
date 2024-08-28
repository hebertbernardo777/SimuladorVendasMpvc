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
    searchClients: "",
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
  const [search, setSearch] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [letterInitial, setLetterInitial] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const product = products.find((p) => p.DESCRPROD === selectedProduct);
  const [productPrice, setProductPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);

  const productName = data.product;
  const suframa = data.suframa;

  const calculateProductPrice = () => {
    switch (suframa) {
      case "Não optante":
        return product.AD_VLRINTERESTADUAL;
      case "isento-todos":
        return product.AD_VLRISENTOTODOSIMP;
      case "isento-ICMSIPI":
        return product.AD_ISENTOICMSIPI;
      case "isento-IPI":
        return product.AD_VLRISENTOIPI;
      default:
        return product.VLRVENDA;
    }
  };

  useEffect(() => {
    if (product) {
      setProductPrice(calculateProductPrice());
    } else {
      setProductPrice(0);
    }
  }, [product, suframa]);

  // cálculo quantidade
  const quantidadeMininia = product ? product.AD_QTDPC : 0;
  const minusQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - quantidadeMininia);
    }
  };
  const plusQuantity = () => {
    setQuantity(product["AD_QTDPC"] + quantity);
  };

  const calculateTotalPrice = () => {
    return productPrice * (quantity / quantidadeMininia);
  };

  // cálculo desconto
  const plusDiscount = () => {
    const numericDiscount = parseFloat(discount);

    if (Number.isInteger(numericDiscount)) {
      setDiscount(numericDiscount + 1);
    } else {
      setDiscount((numericDiscount + 0.1).toFixed(1));
    }
  };
  const minusDiscount = () => {
    const numericDiscount = parseFloat(discount);

    if (Number.isInteger(numericDiscount)) {
      setDiscount(numericDiscount - 1);
    } else {
      setDiscount((numericDiscount - 0.1).toFixed(1));
    }
  };

  const discountPercent = discount / 100;
  const discountApplied = calculateTotalPrice() * discountPercent;
  const orderTotal = calculateTotalPrice() - discountApplied;

  const value = {
    data,
    setData,
    currentStep,
    setCurrentStep,
    products,
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct,
    search,
    setSearch,
    imagePath,
    product,
    letterInitial,
    setLetterInitial,
    cartItems,
    setCartItems,
    productPrice,
    setProductPrice,
    calculateProductPrice,
    quantity,
    setQuantity,
    discount,
    setDiscount,
    productName,
    discountPercent,
    discountApplied,
    minusQuantity,
    plusQuantity,
    calculateTotalPrice,
    minusDiscount,
    plusDiscount,
    orderTotal,
  };
  useEffect(() => {
    if (product && product.AD_QTDPC) {
      setQuantity(product.AD_QTDPC);
    }
  }, [product]);

  useEffect(() => {
    if (product && product.AD_IMGAPP) {
      const path = `/src/assets/ImageProducts/${product.AD_IMGAPP}.png`;
      setImagePath(path);
    }
  }, [product]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

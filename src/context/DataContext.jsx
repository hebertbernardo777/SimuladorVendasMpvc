import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectSubLinha, setSelectSubLinha] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientNoRegister, setClientNoRegister] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [discountAPR, setDiscountAPR] = useState("");
  const [discountREP, setDiscountREP] = useState("");
  const [selectedNegociacao, setSelectedNegociacao] = useState(null);
  const [freteSelected, setFreteSelected] = useState("");
  const [fretePercente, setFretePercente] = useState("");
  const [freteTotal, setFreteTotal] = useState(0);
  const [valueST, setValueST] = useState(0);

  const [data, setData] = useState({
    tipoVenda: "",
    faturamento: "",
    faturamentoLabel: "",
    frete: "",
    freteLabel: "",
    transportadora: "",
    transportadoraLabel: "",
    negociacao: "",
    negociacaoLabel: "",
    valorFinal: "",
    freteNegociado: false,
    textValorFinal: "",
    textSomarFrete: "",
    consultarST: false,
    selectOpcoes: "D",
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

  const resetForm = () => {
    localStorage.removeItem("dataNewOrders");
    localStorage.removeItem("formCategory");
    setSelectedClient(null);
    setClientNoRegister(null);
    setData({
      tipoVenda: "",
      faturamento: "",
      frete: "",
      transportadora: "",
      negociacao: "",
      valorFinal: false,
      freteNegociado: false,
      consultarST: false,
      observacoes: "",
      search: "",
    });
    setCartItems([]);
    setCurrentStep(0);
  };

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    data,
    setData,
    currentStep,
    setCurrentStep,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedProduct,
    setSelectedProduct,
    selectSubLinha,
    setSelectSubLinha,
    search,
    setSearch,
    cartItems,
    setCartItems,
    resetForm,
    selectedClient,
    setSelectedClient,
    clientNoRegister,
    setClientNoRegister,
    isChecked,
    setIsChecked,
    discountAPR,
    setDiscountAPR,
    discountREP,
    setDiscountREP,
    selectedNegociacao,
    setSelectedNegociacao,
    freteSelected,
    setFreteSelected,
    fretePercente,
    setFretePercente,
    freteTotal,
    setFreteTotal,
    valueST,
    setValueST,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

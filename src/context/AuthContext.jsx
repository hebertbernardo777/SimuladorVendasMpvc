import { createContext, useState, useEffect } from "react";
import { api } from "../lib/products";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.toJSON());
        setLoading(false);
      });
  }, []);

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

  const products = posts.rows || [];
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [search, setSearch] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [letterInitial, setLetterInitial] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [discountsByLine, setDiscountsByLine] = useState({});
  const [totalValueByLine, setTotalValueByLine] = useState({});

  const product = products.find((p) => p.DESCRPROD === selectedProduct);
  const productName = data.product;
  const suframa = data.suframa;

  const calculateProductPrice = () => {
    if (selectedClient) {
      const suframaListado = selectedClient.GRUPOICMS;

      switch (suframaListado) {
        case 102:
          return product.AD_VLRISENTOTODOSIMP;
        case 103:
          return product.AD_ISENTOICMSIPI;
        case 101:
          return product.AD_VLRISENTOIPI;
        default:
          return product.VLRVENDA;
      }
    } else {
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
    }
  };

  const resetForm = ()=>{
    setSelectedClient(null);
    setData({});
    setCartItems([])
    setCurrentStep(0)
  }

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
    return productPrice * quantity;
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

  const totalPrice = cartItems.reduce((acc, item) => item.totalOrders + acc, 0);
  console.log(totalPrice);

  // calculo do desconto no pedido
  const TotalValorTabela = cartItems.reduce(
    (acc, item) => acc + item.priceTotal,
    0
  );

  console.log(TotalValorTabela);

  const generalDiscount = TotalValorTabela && totalPrice ? ((TotalValorTabela - totalPrice) / TotalValorTabela) * 100 : 0;
  console.log(generalDiscount);

  
  

  // desconto por linha
  // Função para agrupar produtos por linha e somar descontos
  const discountLineProduct = (cartItems) => {
    console.log("Calculando desconto por linha para:", cartItems); // Verificando os itens no carrinho
    return cartItems.reduce((acc, item) => {
      const { line, discount} = item;
      console.log(`Item: ${item.name}, Line: ${line}, Discount: ${discount}`);
      if (acc[line]) {
        acc[line] += discount; // Soma o desconto se já existir
      } else {
        acc[line] = discount; // Cria a entrada de desconto para a linha
      }
      return acc;
    }, {});
  };
  if (generalDiscount === 0) {
    console.log("Desconto geral não foi aplicado corretamente.");
  }
  console.log( discount)
 

  // Calculando os descontos por linha
  const totalDiscountLineProduct = discountLineProduct(cartItems);
  console.log("Descontos por linha:", totalDiscountLineProduct); // Verificando o cálculo do desconto

  const infosGroupProduct = (cartItems) => {
    console.log("Calculando desconto por linha para:", cartItems);
    return cartItems.reduce((acc, item) => {
      const { category, totalOrders, discount } = item;
      if (!acc[category]) {
        acc[category] = {
          totalOrders: 0,
          discount: 0,
        };
      }
      acc[category].totalOrders += totalOrders;
      acc[category].discount += discount;

      return acc;
    }, {});
  };

  const infosGroups = infosGroupProduct(cartItems);
  console.log("informações por categorias", infosGroups);


  const value = {
    data,
    setData,
    currentStep,
    setCurrentStep,
    products,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
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
    resetForm,
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
    loading,
    setLoading,
    selectedClient,
    setSelectedClient,
    totalPrice,
    TotalValorTabela,
    generalDiscount,
    discountsByLine,
    setDiscountsByLine,
    totalDiscountLineProduct,
    totalValueByLine,
    setTotalValueByLine,
    infosGroups
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

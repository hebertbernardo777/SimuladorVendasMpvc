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
    textValorFinal: "",
    textSomarFrete: "",
    consultarST: "",
    selectOpcoes: "demaisContibuintes",
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
  const [selectSubLinha, setSelectSubLinha] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [search, setSearch] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [letterInitial, setLetterInitial] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientNoRegister, setClientNoRegister] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [discountResults, setDiscountResults] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const product = products.find((p) => p.DESCRPROD === selectedProduct);
  const productName = data.product;
  const suframa = data.suframa;

  const calculateProductPrice = () => {
    if (selectedClient) {
      const suframaListado = selectedClient.GRUPOICMS;
      const ufSuframa = selectedClient.UF;
      const estadosAmazonia = ["AM", "AC", "AP", "RR", "RO"];

      if (ufSuframa === "GO") {
        return product.VLRVENDA;
      }

      if (estadosAmazonia.includes(ufSuframa)) {
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
      }

      return product.AD_VLRINTERESTADUAL;
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

  useEffect(() => {
    if (product) {
      setProductPrice(calculateProductPrice());
    } else {
      setProductPrice(0);
    }
  }, [product, suframa, selectedClient]);

  // resetar form
  const resetForm = () => {
    setSelectedClient(null);
    setClientNoRegister(null);
    setData({});
    setCartItems([]);
    setCurrentStep(0);
  };

  // cálculo quantidade
  const quantidadeMininia = product?.AD_QTDPC || 0;
  const minusQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - quantidadeMininia);
    }
  };
  const plusQuantity = () => {
    setQuantity(product["AD_QTDPC"] + quantity);
  };

  // cálculo desconto
  const adjustDecimal = (value) => {
    return Math.round(value * 10) / 10;
  };

  const plusDiscount = () => {
    const numericDiscount = parseFloat(discount);
    setDiscount(adjustDecimal(numericDiscount + 1));
  };
  const minusDiscount = () => {
    const numericDiscount = parseFloat(discount);

    if (numericDiscount > 0) {
      setDiscount(adjustDecimal(numericDiscount - 1));
    }
  };

  const totalValueItem = productPrice * quantity;
  console.log(totalValueItem); //antes do desconto

  const calculateOrderTotal = () => {
    const discountApplied = (totalValueItem * parseFloat(discount)) / 100; //valor total do pedido * o desconto valor do desconto
    const orderTotal = totalValueItem - discountApplied; //valor total com desconto

    setTotalPrice(totalValueItem);
    setDiscountApplied(discountApplied);
    setOrderTotal(orderTotal);
  };

  useEffect(() => {
    calculateOrderTotal();
  }, [discount, quantity, productPrice]);

  // valor do disconto

  const totalDiscountApllied = (discountApplied / totalValueItem) * 100;
  console.log("resultado", totalDiscountApllied);

  const totalPriceOrders = cartItems.reduce(
    (acc, item) => (item.priceTotal || 0) + acc,
    0
  );
  console.log(totalPriceOrders);  

  const totalOrders = cartItems.reduce(
    (acc, item) => (item.totalOrders || 0) + acc,
    0
  );
  console.log(totalOrders);

  const totalValueDiscount = cartItems.reduce(
    (acc, item) => (item.discountTotal || 0) + acc,
    0
  );
  console.log(totalValueDiscount);

  // Soma o total de descontos aplicados (incluindo o novo desconto)
  const totalDiscount = totalValueDiscount + discountApplied;

  // Soma o valor total do carrinho (itens já existentes + novo item)
  const totalValue = totalPriceOrders + totalValueItem;

  // Calcula o percentual total de desconto aplicado ao pedido
  const calcDiscountTotalOrders = (totalDiscount / totalValue) * 100;

  // Exibe o percentual total de desconto aplicado ao pedido
  console.log(
    `Percentual total de desconto aplicado: ${calcDiscountTotalOrders.toFixed(2)}%`
  );

  const calcDiscountTotalOrdersResume =
    totalPriceOrders > 0 ? (totalValueDiscount / totalPriceOrders) * 100 : 0;
  console.log("Desconto calculado:", calcDiscountTotalOrdersResume);

  // Função para agrupar produtos por linha e somar descontos
  const discountLineProduct = (cartItems) => {
    console.log("Calculando desconto por linha e categoria para:", cartItems); // Verificando os itens no carrinho
  
    // Acumula os totais por linha
    const lineTotals = cartItems.reduce((acc, item) => {
      const { line, category, totalOrders, discountTotal, priceTotal } = item;
      console.log(
        `Item: ${item.name}, Line: ${line}, Categoria: ${category}, Preço total: ${totalOrders}, discount: ${discountTotal}, priceTotal: ${priceTotal}`
      );
  
      if (!acc[line]) {
        acc[line] = {
          categories: {},
          ordersTotal: 0, // Renomeado de priceTotal para ordersTotal
          discountTotal: 0,
          priceTotal: 0, // Adicionando o priceTotal separadamente
        };
      }
  
      if (!acc[line].categories[category]) {
        acc[line].categories[category] = {
          categoryValueTotal: 0,
          discountCategoryTotal: 0, // Corrigido nome
        };
      }
  
      // Adiciona o desconto, preço total e o total do pedido à linha
      acc[line].ordersTotal += totalOrders; // Somando o total do pedido
      acc[line].discountTotal += discountTotal || 0;
      acc[line].priceTotal += priceTotal || 0; // Somando o priceTotal
  
      // Acumula os valores por categoria
      acc[line].categories[category].categoryValueTotal += priceTotal;
      acc[line].categories[category].discountCategoryTotal += discountTotal || 0;
  
      return acc;
    }, {});
  
    // Calcula o total geral
    const grandTotal = Object.values(lineTotals).reduce(
      (acc, { ordersTotal }) => acc + ordersTotal,
      0
    );
  
    // Calcula o percentual para cada linha
    const resultWithPercentages = Object.entries(lineTotals).reduce(
      (acc, [line, { ordersTotal, discountTotal, priceTotal, categories }]) => {
        const percentage =
          grandTotal > 0 ? (ordersTotal / grandTotal) * 100 : 0;
        const totalDiscountLine =
          priceTotal > 0 ? (discountTotal / priceTotal) * 100 : 0; // Usando priceTotal para cálculo do desconto
  
        // Calcula os valores e percentuais por categoria
        const categoriesValues = Object.entries(categories).reduce(
          (catAcc, [category, { categoryValueTotal, discountCategoryTotal }]) => {
            const categoryDiscount =
              categoryValueTotal > 0
                ? (discountCategoryTotal / categoryValueTotal) * 100
                : 0;

                const categoryPercentage =
                ordersTotal > 0 ? (categoryValueTotal /ordersTotal ) * 100 : 0;
  
            catAcc[category] = {
              totalCategory: categoryValueTotal.toFixed(2),
              discountCategory: categoryDiscount.toFixed(2) + "%",
              percentageCategory: categoryPercentage.toFixed(2) + "%",
            };
            return catAcc;
          },
          {}
        );
  
        acc[line] = {
          categories: categoriesValues,
          discount: totalDiscountLine.toFixed(2) + "%", // Percentual de desconto por linha baseado em priceTotal
          ordersTotal: ordersTotal.toFixed(2), // Mantendo o ordersTotal
          priceTotal: priceTotal.toFixed(2), // Mantendo o priceTotal
          percentage: percentage.toFixed(2) + "%", // Formata para duas casas decimais
        };
        return acc;
      },
      {}
    );
  
    return resultWithPercentages; // Retorna o resultado com percentuais
  };
  
 
  useEffect(()=>{
    const results = discountLineProduct(cartItems)
    setDiscountResults(results)
    console.log("Resultados com percentuais:", results);
  },[cartItems])


  console.log("Produto Selecionado no Contexto:", selectedProduct);
  

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
    selectSubLinha,
    setSelectSubLinha,
    search,
    setSearch,
    posts, setPosts,
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
    minusQuantity,
    plusQuantity,
    minusDiscount,
    plusDiscount,
    totalValueItem,
    loading,
    setLoading,
    selectedClient,
    setSelectedClient,
    clientNoRegister,
    setClientNoRegister,
    totalPrice,
    discountApplied,
    orderTotal,
    totalOrders,
    totalPriceOrders,
    calcDiscountTotalOrders,
    calcDiscountTotalOrdersResume,
    isChecked,
    setIsChecked,
    discountResults,
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

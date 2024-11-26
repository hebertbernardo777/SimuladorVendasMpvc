import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { api } from "../lib/products";

const useCategoriesFunctions = () => {
  const [posts, setPosts] = useState([]);
  const {
    setLoading,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectSubLinha,
    setSelectSubLinha,
    setSelectedProduct,
    search,
    setSearch,
  } = useContext(DataContext);
  const [isActive, setIsActive] = useState(null);
  const [letterInitial, setLetterInitial] = useState("");

  useEffect(() => {
    console.log("Chamando API..."); // Verifique se está entrando no useEffect
    setLoading(true);
    api
      .get("/")
      .then((response) => {
        console.log("Resposta da API:", response); // Aqui, você verifica toda a resposta
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Erro na API:", err); // Verifique se há erro
        setLoading(false);
      });
  }, []);

  const rows = posts.rows || [];

  const categories = Object.keys(
    rows.reduce((acc, row) => ({ ...acc, [row.AD_SUBGRUPO]: true }), {})
  );

  const searchProducts = rows.filter(
    (produto) =>
      produto.DESCRPROD &&
      produto.DESCRPROD.toUpperCase().includes(search.toUpperCase())
  );

  const filteredProducts = selectedCategory
    ? rows.filter((product) => product.AD_SUBGRUPO === selectedCategory)
    : [];

  const filterCategory = Object.keys(
    filteredProducts.reduce((acc, row) => {
      if (row.AD_CLASSE !== null && row.AD_CLASSE !== undefined) {
        acc[row.AD_CLASSE] = true;
      }
      return acc;
    }, {})
  );

  const filteredLines = Object.keys(
    rows.reduce((acc, product) => {
      if (
        product.AD_SUBGRUPO === selectedCategory &&
        product.AD_LINHAPRODUTOS
      ) {
        acc[product.AD_LINHAPRODUTOS] = true;
      }
      return acc;
    }, {})
  );

  const filterSubCategory = selectedSubCategory
    ? rows.filter((product) => product.AD_CLASSE === selectedSubCategory)
    : filteredProducts;

  const filteredProductsByLineAndSubCategory = rows.filter((product) => {
    return (
      product.AD_SUBGRUPO === selectedCategory &&
      (!selectedSubCategory || product.AD_CLASSE === selectedSubCategory) &&
      (!selectSubLinha || product.AD_LINHAPRODUTOS === selectSubLinha)
    );
  });

  const handleCategory = (setFieldValue, category) => {
    setFieldValue("category", category);
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setSelectedProduct("");
    setLetterInitial(category.charAt(0).toUpperCase());
  };

  const handleSubCategory = (setFieldValue, subCategory) => {
    setFieldValue("subCategory", subCategory);
    setSelectedSubCategory(subCategory);
  };

  const handleSelectProduct = (product) => {
    console.log("Selected Product CODPROD:", product.CODPROD); // Verifique se está definido
    setSelectedProduct(product.DESCRPROD);
    setIsActive(product.CODPROD);
    console.log(product);
  };

  const handleSelectLine = (setFieldValue, line) => {
    setSelectSubLinha(line);
    setFieldValue("line", line);
    console.log("Selected Line:", line);
  };

  return {
    categories,
    searchProducts,
    filteredProducts,
    filterCategory,
    filteredLines,
    filterSubCategory,
    filteredProductsByLineAndSubCategory,
    letterInitial,
    search,
    setSearch,
    handleCategory,
    handleSubCategory,
    handleSelectProduct,
    handleSelectLine,
    isActive,
  };
};

export default useCategoriesFunctions;

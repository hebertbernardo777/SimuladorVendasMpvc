import React, { useState, useEffect, useContext } from "react";
import { api } from "../lib/products";


const useCalcProducts = (data, selectProduct, product, selectClient) => {
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
        console.error(err.toJSON());
        setLoading(false);
      });
  }, []);

  const products = posts.rows || [];
 
  return {
    posts,
    loading, // Retornando o estado de loading
    products, // Retornando o produto encontrado
  };
};


export default useCalcProducts;

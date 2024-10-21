import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { api } from "../lib/rotas";

const useRotas = () => {
  const { data, posts, setPosts, loading, setLoading } =
    useContext(DataContext);
  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.ToJSON());
        setLoading(false);
      });
  }, []);
  if (loading) return <p>carregando</p>;
  useEffect(() => {
    // Verifique se data está definido e se frete existe
    if (data && data.frete) {
      setFrete(data.frete); // Salva o valor de frete no estado
      console.log("Frete:", data.frete); // Log do frete
    }
  }, [data, setFrete]);

  return {
    posts,
    frete,
  };
};

export default useRotas;

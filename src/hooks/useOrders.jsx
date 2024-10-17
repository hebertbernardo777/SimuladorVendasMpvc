import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { api } from "../lib/parametros";

const useOrders = () => {
  const {
    posts,
    setPosts,
    data,
    setData,
    loading,
    setLoading,
    selectedClient,
    setSelectedClient,
    clientNoRegister,
    setClientNoRegister,
    setDiscountAPR,
    setDiscountREP,
  } = useContext(DataContext);
  const [validationError, setValidationError] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("dataNewOrders");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      if (parsedData.client) {
        if (typeof parsedData.client === "object") {
          setSelectedClient(parsedData.client);
        } else {
          setClientNoRegister(parsedData.client);
        }
      }
      if (parsedData.updates) {
        setData(parsedData.updates);
      }
    }
  }, [setData, setSelectedClient, setClientNoRegister]);

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

  if (loading) return <p>carregando</p>;

  const handleParamsMargem = () => {
    if (
      posts &&
      posts.paramsMargem &&
      Array.isArray(posts.paramsMargem) &&
      posts.paramsMargem.length > 0
    ) {
      console.log("Dados de paramsMargem:", posts.paramsMargem); // Verifique o que está aqui
      const margem = posts.paramsMargem[0];

      const { DESCONTOREP } = margem;
      console.log("DESCONTOREP:", DESCONTOREP); // Verifique o valor
      setDiscountREP(DESCONTOREP);

      const { DESCONTOAPR } = margem;
      console.log("DESCONTOAPR:", DESCONTOAPR); // Verifique o valor
      setDiscountAPR(DESCONTOAPR);
    } else {
      console.log("Erro: paramsMargem não está definido ou está vazio.");
    }
  };

  const validateClientSelection = () => {
    if (!selectedClient && !clientNoRegister) {
      setValidationError(true);
      alert("Selecione um cliente");
      return false;
    }
    setValidationError(false);
    return true;
  };

  const handleSubmit = (values) => {
    console.log("Form values on submit:", values);
    if (!validateClientSelection()) {
      return;
    }
    handleParamsMargem();
    const updates = { ...data, ...values };
    setData(updates);

    const formClientData = {
      client: selectedClient || clientNoRegister,
      updates: updates,
    };

    localStorage.setItem("dataNewOrders", JSON.stringify(formClientData));
    Navigate("/category");
  };

  return {
    posts,
    loading,
    handleSubmit,
    validateClientSelection,
  };
};

export default useOrders;

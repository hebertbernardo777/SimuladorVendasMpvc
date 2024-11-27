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
    selectedClient,
    setSelectedClient,
    clientNoRegister,
    setClientNoRegister,
    setDiscountAPR,
    setDiscountREP,
    setSelectedNegociacao,
  } = useContext(DataContext);
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(true);
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
    const storedNegociacao = localStorage.getItem("selectedNegociacao");
    if (storedNegociacao) {
      setSelectedNegociacao(JSON.parse(storedNegociacao));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
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
  }, [selectedClient]);

  if (loading) return <p>carregando</p>;

  const handleParamsMargem = () => {
    if (
      posts &&
      posts.paramsMargem &&
      Array.isArray(posts.paramsMargem) &&
      posts.paramsMargem.length > 0
    ) {
      const margem = posts.paramsMargem[0];

      const { DESCONTOREP } = margem;
      setDiscountREP(DESCONTOREP);

      const { DESCONTOAPR } = margem;
      setDiscountAPR(DESCONTOAPR);
    } else {
      console.log("Erro: paramsMargem não está definido ou está vazio.");
    }
  };

  const handleChangeNegociacao = (e, setFieldValue) => {
    const codTipoVenda = e.target.value;
    const negociacaoSelecionada = posts.tiposNegociacao.find(
      (tipo) => tipo.CODTIPVENDA === Number(codTipoVenda)
    );

    setFieldValue("negociacaoLabel", negociacaoSelecionada.DESCRTIPVENDA); // Verifique se encontrou o item correto
    setSelectedNegociacao(negociacaoSelecionada); // Salva o objeto completo no estado
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
    handleChangeNegociacao,
  };
};

export default useOrders;

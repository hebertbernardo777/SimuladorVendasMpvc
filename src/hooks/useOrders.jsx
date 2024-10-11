import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { api } from "../lib/parametros";

const useOrders = () => {
  const {
    data,
    setData,
    loading,
    setLoading,
    selectedClient,
    clientNoRegister,
  } = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [validationError, setValidationError] = useState(false);
  const Navigate = useNavigate();

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
    setData({ ...data, ...values });
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

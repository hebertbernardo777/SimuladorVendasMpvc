import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const useDraftsManagement = () => {
  const {
    data,
    cartItems,
    setCartItems,
    selectedClient,
    clientNoRegister,
    currentStep,
    resetForm,
  } = useContext(DataContext);

  const navigate = useNavigate();
  // salvar rascunhos
  const handleSaveToLocalStorage = () => {
    const currentDate = new Date().toLocaleDateString();
    const uniqueId = Date.now(); // Gerando um ID único baseado no timestamp

    const combinedData = {
      id: uniqueId,
      client: selectedClient || clientNoRegister,
      form: data,
      cart: cartItems,
      dateSaved: currentDate,
      currentStep,
    };

    const savedData = JSON.parse(localStorage.getItem("pedido")) || [];
    // Adiciona o novo pedido ao array
    const updatedData = [...savedData, combinedData];
    // Salva o array atualizado no localStorage
    localStorage.setItem("pedido", JSON.stringify(updatedData));
    setCartItems([]);
    navigate("/");
    resetForm();
  };

  return { handleSaveToLocalStorage };
};

export default useDraftsManagement;

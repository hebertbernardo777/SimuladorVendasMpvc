import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Button from "../../components/Button/Button";
import CartItems from "../../components/Cart/CartItems";
import ProductSummary from "../../components/Summary/ProductSummary";
import formatCurrency from "../../utils/formatCurrency";
import "./Summary.css";
import useSummary from "../../hooks/useSummary";
import useRotas from "../../hooks/useRotas";
import { ProductContext } from "../../context/ProductContext";
import useConsultaST from "../../hooks/useConsultaST";

const Summary = () => {
  const {
    data,
    currentStep,
    cartItems,
    setCartItems,
    selectedClient,
    clientNoRegister,
    freteSelected,
    resetForm,
  } = useContext(DataContext);
  const { totalOrders, calcDiscountTotalOrdersResume, totalValueST } =
    useSummary();
  const { percenteFrete, freteTotal } = useRotas();
  const { calcConsultaST } = useConsultaST();

  console.log(freteTotal);
  console.log(freteSelected);

  useEffect(() => {
    calcConsultaST();
  }, []);

  useEffect(() => {
    // Chama a função para verificar as etapas de cálculo
    const freteCalculado = percenteFrete();
    console.log("Frete calculado na verificação:", freteCalculado);
  }, [percenteFrete]);

  const navigate = useNavigate();

  const handleSaveToLocalStorage = () => {
    const currentDate = new Date().toLocaleDateString();
    const uniqueId = Date.now(); // Gerando um ID único baseado no timestamp

    const combinedData = {
      id: uniqueId, // Usando um identificador único
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

  return (
    <div className="container-summary">
      <h3>Resumo da compra</h3>
      <div className="cart-summary">
        <div className="cart-infos">
          <div className="items-cart">
            {cartItems.map((cartItem) => (
              <CartItems key={cartItem.productId} newItem={cartItem} />
            ))}
          </div>
        </div>
        <div className="cart">
          <ProductSummary />
        </div>
      </div>
      <div className="summary-discount">
        <div className="infos-summary">
          <p>Total Frete</p>{" "}
          <span>
            {freteSelected !== "" && freteSelected !== undefined
              ? freteSelected
              : formatCurrency(freteTotal, "BRL")}
          </span>
        </div>
        <div className="infos-summary">
          <p>Valor total ST:</p>
          <span>{formatCurrency(totalValueST, "BRL")}</span>
        </div>
        <div className="infos-summary">
          <p>Desconto realizado no pedido</p>
          <span> {calcDiscountTotalOrdersResume.toFixed(2)}%</span>
        </div>
        <div className="infos-summary">
          <p>Total</p>
          <span> {formatCurrency(totalOrders, "BRL")}</span>
        </div>
        <div className="infos-summary">
          <p>Total + Frete</p>
          <span> {formatCurrency(totalOrders, "BRL")}</span>
        </div>
      </div>
      <div className="summary-btn">
        <Button className="btn" children={"Finalizar Compra"} />
      </div>
      <div className="drafts-link">
        <a href="#" onClick={handleSaveToLocalStorage}>
          <p>Salvar Rascunho</p>
        </a>
      </div>
    </div>
  );
};

export default Summary;

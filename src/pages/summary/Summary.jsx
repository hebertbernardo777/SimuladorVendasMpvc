import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import CartItems from "../../components/Cart/CartItems";
import ProductSummary from "../../components/Summary/ProductSummary";
import formatCurrency from "../../utils/formatCurrency";
import "./Summary.css";

const Summary = () => {
  const {
    data,
    currentStep,
    cartItems,
    setCartItems,
    selectedClient,
    clientNoRegister,
    totalPriceOrders,
    totalOrders,
    calcDiscountTotalOrdersResume,
  } = useContext(AuthContext);
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
  };

  return (
    <div className="container-summary">
      <h3>Resumo da compra</h3>
      <div className="items-cart">
        {cartItems.map((cartItem) => (
          <CartItems key={cartItem.productId} newItem={cartItem} />
        ))}
      </div>
      <div className="summary-discount">
        <div className="infos-summary">
          <p>Frete</p> <span>5</span>
        </div>
        <div className="infos-summary">
          <p>Desconto realizado no pedido</p>
          <span> {calcDiscountTotalOrdersResume.toFixed(2)}%</span>
        </div>
        <div className="infos-summary">
          <p>Total</p>
          <span> {formatCurrency(totalOrders, "BRL")}</span>
        </div>
      </div>
      <ProductSummary />
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

import React, { useContext, useEffect } from "react";
import "./Summary.css";
import Button from "../Button/Button";
import { AuthContext } from "../../context/AuthContext";
import CartItems from "../Cart/CartItems";
import formatCurrency from "../../utils/formatCurrency";

const Summary = () => {
  const { cartItems } = useContext(AuthContext);

  const totalPrice = cartItems.reduce((acc, item) => item.totalOrders + acc, 0);

  const TotalDiscount = cartItems.reduce(
    (acc, item) => item.appliedDiscount + acc, 0);

 

  return (
    <div className="container-summary">
      <h3>Resumo da compra</h3>
      <div className="items-cart">
        {cartItems.map((cartItem) => (
          <CartItems key={cartItem.CODPROD} newItem={cartItem} />
        ))}
      </div>
      <div className="summary-discount">
        <div className="infos-summary">
          <p>Frete</p> <span>5</span>
        </div>
        <div className="infos-summary">
          <p>Total de Descontos</p>
          <span>{formatCurrency(TotalDiscount, "BRL")}</span>
        </div>
        <div className="infos-summary">
          <p>Total</p>
          <span>{formatCurrency(totalPrice, "BRL")}</span>
        </div>
      </div>

      <div className="summary-btn">
        <Button className="btn" children={"Finalizar Compra"} />
      </div>

      <div className="drafts">
        <a href="#">
          <p>Salvar Rascunho</p>
        </a>
      </div>
    </div>
  );
};

export default Summary;

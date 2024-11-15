import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import Button from "../../components/Button/Button";
import CartItems from "../../components/Cart/CartItems";
import ProductSummary from "../../components/Summary/ProductSummary";
import formatCurrency from "../../utils/formatCurrency";
import useSummary from "../../hooks/useSummary";
import useDraftsManagement from "../../hooks/useDraftsManagement";
import useCalLine from "../../hooks/useCalLine";
import "./Summary.css";
import useConsultaST from "../../hooks/useConsultaST";
import useEnvio from "../../hooks/useEnvio";

const Summary = () => {
  const { cartItems, freteTotal } = useContext(DataContext);
  const { totalOrders, calcDiscountTotalOrdersResume } = useSummary();
  const { handleSaveToLocalStorage } = useDraftsManagement();
  const { totalValueST } = useConsultaST();
  useCalLine();
  useEnvio();

  return (
    <>
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
            <p>Total Frete</p> <span>{freteTotal}</span>
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
            <span> {}</span>
          </div>
        </div>
        <div className="summary-btn">
          <Button className="btn" children={"Finalizar Compra"} />
        </div>
        <div className="drafts-link">
          <a onClick={handleSaveToLocalStorage}>
            <p>Salvar Rascunho</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Summary;

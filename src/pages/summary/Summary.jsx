import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Button from "../../components/Button/Button";
import CartItems from "../../components/Cart/CartItems";
import ProductSummary from "../../components/Summary/ProductSummary";
import formatCurrency from "../../utils/formatCurrency";
import useSummary from "../../hooks/useSummary";
import useDraftsManagement from "../../hooks/useDraftsManagement";
import "./Summary.css";
import useCalLine from "../../hooks/useCalLine";

const Summary = () => {
  const { cartItems, freteTotal } = useContext(DataContext);
  const { totalOrders, calcDiscountTotalOrdersResume, totalValueST } = useSummary();
  const { handleSaveToLocalStorage } = useDraftsManagement();
  useCalLine(); 
  
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

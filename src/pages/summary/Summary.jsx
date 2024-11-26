import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { ResumeContext } from "../../context/ResumeContext";
import Button from "../../components/Button/Button";
import CartItems from "../../components/Cart/CartItems";
import ProductSummary from "../../components/Summary/ProductSummary";
import formatCurrency from "../../utils/formatCurrency";
import useSummary from "../../hooks/useSummary";
import useDraftsManagement from "../../hooks/useDraftsManagement";
import useConsultaST from "../../hooks/useConsultaST";
import useCalLine from "../../hooks/useCalLine";
import useEnvio from "../../hooks/useEnvio";
import Print from "../../components/Print/Print";
import { LuPrinter } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import "./Summary.css";

const Summary = () => {
  const { cartItems, freteTotal } = useContext(DataContext);
  const { totalComFrete } = useContext(ResumeContext);
  const { handleSaveToLocalStorage } = useDraftsManagement();
  const { totalValueST } = useConsultaST();
  const { handleEnvio } = useEnvio();
  useCalLine();
  const {
    totalOrders,
    calcDiscountTotalOrdersResume,
    componentRef,
    handlePrint,
  } = useSummary();

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
            <span> {formatCurrency(totalComFrete, "BRL")}</span>
          </div>
        </div>
        <div className="summary-btn">
          <Button
            className="btn"
            children={"Finalizar Compra"}
            onClick={handleEnvio}
          />
        </div>
        <div className="drafts-link">
          <a onClick={handleSaveToLocalStorage}>
            <FaRegBookmark /> <span>Salvar Rascunho</span>
          </a>
          <div className="drafts-print" onClick={handlePrint}>
            <LuPrinter className="icon-print" /> <span>imprimir</span>
          </div>
          <div style={{ display: "none" }}>
            <Print ref={componentRef} />
          </div>
        </div>
       
      </div>
      
    </>
  );
};

export default Summary;

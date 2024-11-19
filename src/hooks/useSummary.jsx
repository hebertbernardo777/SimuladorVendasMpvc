import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { ProductContext } from "../context/ProductContext";
import { ResumeContext } from "../context/ResumeContext";
import { useReactToPrint } from "react-to-print";
import useRotas from "./useRotas";
import useConsultaST from "./useConsultaST";

const useSummary = () => {
  const { cartItems, freteTotal } = useContext(DataContext);
  const { setTotalComFrete } = useContext(ResumeContext);
  const { discountApplied, totalPrice } = useContext(ProductContext);
  useConsultaST();
  useRotas();

  // soma dos valores de todos os itens do carrinho sem o desconto
  const totalPriceOrders = cartItems.reduce(
    (acc, item) => (item.priceTotal || 0) + acc,
    0
  );

  // soma dos valores de todos os itens do carrinho com o desconto
  const totalOrders = cartItems.reduce(
    (acc, item) => (item.totalOrders || 0) + acc,
    0
  );

  //soma total em reais do desconto total
  const totalValueDiscount = cartItems.reduce(
    (acc, item) => (item.discountTotal || 0) + acc,
    0
  );

  // Soma o total de descontos aplicados (itens já existentes + novo item)
  const totalDiscount = totalValueDiscount + discountApplied;

  // Soma o valor total do carrinho (itens já existentes + novo item) sem o desconto
  const totalValue = totalPriceOrders + totalPrice;

  // Calcula o percentual total de desconto aplicado ao pedido
  const calcDiscountTotalOrders = (totalDiscount / totalValue) * 100;

  // desconto total apenas do carrinho
  const calcDiscountTotalOrdersResume =
    totalPriceOrders > 0 ? (totalValueDiscount / totalPriceOrders) * 100 : 0;

  // print
  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {}, []);

  const handleBeforePrint = React.useCallback(() => {
    return Promise.resolve();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  // soma do frete + valor final
  const calcularTotalComFrete = () => {
    let valorFrete;
    if (typeof freteTotal === "string" && freteTotal.includes("%")) {
      const percentualFrete = parseFloat(freteTotal.replace("%", "")) || 0;
      valorFrete = (percentualFrete / 100) * totalOrders;
    } else if (typeof freteTotal === "string" && freteTotal.includes("R$")) {
      const valorFreteString = freteTotal
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".");
      valorFrete = parseFloat(valorFreteString) || 0;
    }

    const total = totalOrders + valorFrete;
    setTotalComFrete(total);
    return total;
  };

  useEffect(() => {
    calcularTotalComFrete();
  }, []);

  return {
    totalPriceOrders,
    totalOrders,
    totalValueDiscount,
    calcDiscountTotalOrders,
    calcDiscountTotalOrdersResume,
    componentRef,
    handlePrint,
  };
};

export default useSummary;

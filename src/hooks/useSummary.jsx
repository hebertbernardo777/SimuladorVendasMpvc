import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { ProductContext } from "../context/ProductContext";
import useRotas from "./useRotas";
import useConsultaST from "./useConsultaST";

const useSummary = () => {
  const { cartItems } = useContext(DataContext);
  const { discountApplied, totalPrice } = useContext(ProductContext);
  useConsultaST();
  useRotas();

  console.log(discountApplied)

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

  // // consulta ST
  // useEffect(() => {
  //   calcConsultaST();
  // }, []);

  return {
    totalPriceOrders,
    totalOrders,
    totalValueDiscount,
    calcDiscountTotalOrders,
    calcDiscountTotalOrdersResume,
  };
};

export default useSummary;

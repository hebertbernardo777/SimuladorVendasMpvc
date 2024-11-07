import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { ResumeContext } from "../context/ResumeContext";

const useCalLine = () => {
  const { cartItems } = useContext(DataContext);
  const { discountResults, setDiscountResults } = useContext(ResumeContext);

  const discountLineProduct = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return {};

    // Acumula os totais por linha
    const lineTotals = cartItems.reduce((acc, item) => {
      const { line, category, totalOrders, discountTotal, priceTotal } = item;

      if (!acc[line]) {
        acc[line] = {
          categories: {},
          ordersTotal: 0, // Renomeado de priceTotal para ordersTotal
          discountTotal: 0,
          priceTotal: 0, // Adicionando o priceTotal separadamente
        };
      }

      if (!acc[line].categories[category]) {
        acc[line].categories[category] = {
          ordersCategoryTotal: 0, // Usando ordersTotal por categoria
          categoryValueTotal: 0, // Mantendo o categoryValueTotal para o cálculo que já existia
          discountCategoryTotal: 0,
        };
      }

      // Acumula o total de pedidos e o valor total por categoria
      acc[line].ordersTotal += totalOrders; // Somando o total do pedido
      acc[line].discountTotal += discountTotal || 0;
      acc[line].priceTotal += priceTotal || 0; // Somando o priceTotal

      // Acumula os valores por categoria
      acc[line].categories[category].ordersCategoryTotal += totalOrders; // Somando totalOrders por categoria
      acc[line].categories[category].categoryValueTotal += priceTotal; // Mantendo o categoryValueTotal
      acc[line].categories[category].discountCategoryTotal +=
        discountTotal || 0;

      return acc;
    }, {});

    // Calcula o total geral
    const grandTotal = Object.values(lineTotals).reduce(
      (acc, { ordersTotal }) => acc + ordersTotal,
      0
    );

    // Calcula o percentual para cada linha
    const resultWithPercentages = Object.entries(lineTotals).reduce(
      (acc, [line, { ordersTotal, discountTotal, priceTotal, categories }]) => {
        const percentage =
          grandTotal > 0 ? (ordersTotal / grandTotal) * 100 : 0;
        const totalDiscountLine =
          priceTotal > 0 ? (discountTotal / priceTotal) * 100 : 0; // Usando priceTotal para cálculo do desconto

        // Calcula os valores e percentuais por categoria
        const categoriesValues = Object.entries(categories).reduce(
          (
            catAcc,
            [
              category,
              {
                ordersCategoryTotal,
                categoryValueTotal,
                discountCategoryTotal,
              },
            ]
          ) => {
            const categoryDiscount =
              categoryValueTotal > 0
                ? (discountCategoryTotal / categoryValueTotal) * 100
                : 0;

            const categoryOrdersDiscount =
              ordersCategoryTotal > 0
                ? (discountCategoryTotal / ordersCategoryTotal) * 100
                : 0;

            catAcc[category] = {
              totalCategory: categoryValueTotal.toFixed(2), // Baseado no priceTotal
              discountCategory: categoryDiscount.toFixed(2) + "%", // Desconto baseado no priceTotal
              percentageCategory: percentage.toFixed(2) + "%", // Percentual do total da linha

              // Novos cálculos baseados em ordersTotal
              totalOrdersCategory: ordersCategoryTotal.toFixed(2), // Agora usando ordersTotal por categoria
              discountOrdersCategory: categoryOrdersDiscount.toFixed(2) + "%", // Percentual de desconto baseado no ordersTotal
            };
            return catAcc;
          },
          {}
        );

        acc[line] = {
          categories: categoriesValues,
          discount: totalDiscountLine.toFixed(2) + "%", // Percentual de desconto por linha baseado em priceTotal
          ordersTotal: ordersTotal.toFixed(2), // Mantendo o ordersTotal
          priceTotal: priceTotal.toFixed(2), // Mantendo o priceTotal
          percentage: percentage.toFixed(2) + "%", // Formata para duas casas decimais
        };
        return acc;
      },
      {}
    );

    return resultWithPercentages; // Retorna o resultado com percentuais
  };

  useEffect(() => {
    const results = discountLineProduct(cartItems);
    setDiscountResults(results);
  }, [cartItems, setDiscountResults]);

  return discountResults;
};

export default useCalLine;

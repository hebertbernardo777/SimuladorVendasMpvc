import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { ProductContext } from "../context/ProductContext";
import { ResumeContext } from "../context/ResumeContext";

const useSummary = () => {
  const { cartItems } = useContext(DataContext);
  const { discountApplied, totalPrice } = useContext(ProductContext);
  const { setDiscountResults } = useContext(ResumeContext);

  // soma dos valores de todos os itens do carrinho sem o desconto
  const totalPriceOrders = cartItems.reduce(
    (acc, item) => (item.priceTotal || 0) + acc,
    0
  );
  console.log(totalPriceOrders);

  // soma dos valores de todos os itens do carrinho com o desconto
  const totalOrders = cartItems.reduce(
    (acc, item) => (item.totalOrders || 0) + acc,
    0
  );
  console.log(totalOrders);

  //soma total em reais do desconto total
  const totalValueDiscount = cartItems.reduce(
    (acc, item) => (item.discountTotal || 0) + acc,
    0
  );
  console.log(totalValueDiscount);

  // Soma o total de descontos aplicados (itens já existentes + novo item)
  const totalDiscount = totalValueDiscount + discountApplied;
  console.log(totalDiscount);

  // Soma o valor total do carrinho (itens já existentes + novo item) sem o desconto
  const totalValue = totalPriceOrders + totalPrice;
  console.log(totalValue);

  // Calcula o percentual total de desconto aplicado ao pedido
  const calcDiscountTotalOrders = (totalDiscount / totalValue) * 100;

  // Exibe o percentual total de desconto aplicado ao pedido
  console.log(
    `Percentual total de desconto aplicado: ${calcDiscountTotalOrders.toFixed(2)}%`
  );

  // desconto total apenas do carrinho
  const calcDiscountTotalOrdersResume =
    totalPriceOrders > 0 ? (totalValueDiscount / totalPriceOrders) * 100 : 0;
  console.log("Desconto calculado:", calcDiscountTotalOrdersResume);

  // Função para agrupar produtos por linha e somar descontos
  const discountLineProduct = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return {};
    console.log("Calculando desconto por linha e categoria para:", cartItems); // Verificando os itens no carrinho

    // Acumula os totais por linha
    const lineTotals = cartItems.reduce((acc, item) => {
      const { line, category, totalOrders, discountTotal, priceTotal } = item;
      console.log(
        `Item: ${item.name}, Line: ${line}, Categoria: ${category}, Preço total: ${totalOrders}, discount: ${discountTotal}, priceTotal: ${priceTotal}`
      );

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
          categoryValueTotal: 0,
          discountCategoryTotal: 0,
        };
      }

      // Adiciona o desconto, preço total e o total do pedido à linha
      acc[line].ordersTotal += totalOrders; // Somando o total do pedido
      acc[line].discountTotal += discountTotal || 0;
      acc[line].priceTotal += priceTotal || 0; // Somando o priceTotal

      // Acumula os valores por categoria
      acc[line].categories[category].categoryValueTotal += priceTotal;
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
            [category, { categoryValueTotal, discountCategoryTotal }]
          ) => {
            const categoryDiscount =
              categoryValueTotal > 0
                ? (discountCategoryTotal / categoryValueTotal) * 100
                : 0;

            // const categoryPercentage =
            //   ordersTotal > 0 ? (categoryValueTotal / ordersTotal) * 100 : 0;

            catAcc[category] = {
              totalCategory: categoryValueTotal.toFixed(2),
              discountCategory: categoryDiscount.toFixed(2) + "%",
              percentageCategory: percentage.toFixed(2) + "%",
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
    console.log("Resultados com percentuais:", results);
  }, [cartItems]);
  return {
    totalPriceOrders,
    totalOrders,
    totalValueDiscount,
    calcDiscountTotalOrders,
    calcDiscountTotalOrdersResume,
  };
};

export default useSummary;

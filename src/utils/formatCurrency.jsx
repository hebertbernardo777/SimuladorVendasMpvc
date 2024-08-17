import React from "react";

const formatCurrency = (value, currency) => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency
  });
};

export default formatCurrency;

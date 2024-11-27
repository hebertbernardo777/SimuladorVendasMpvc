import inseriritenspedido from "axios";

export const apiItens = inseriritenspedido.create({
  baseURL: "api/inseriritenspedido",
  headers: {
    "Content-Type": "application/json",
  },
});

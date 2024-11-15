import inserirpedido from "axios";

export const api = inserirpedido.create({
  baseURL: "api/inserirpedido",
  headers: {
    "Content-Type": "application/json",
  },
});

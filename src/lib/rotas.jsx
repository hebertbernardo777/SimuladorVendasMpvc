import rotas from "axios";

export const api = rotas.create({
  baseURL: "/api/rotas",
  headers: {
    "Content-Type": "application/json",
  },
});

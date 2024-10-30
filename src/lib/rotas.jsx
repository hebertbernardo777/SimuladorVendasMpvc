import clients from "axios";
export const api = clients.create({
  baseURL: "/api/rotas",
  headers: {
    "Content-Type": "application/json",
  },
});

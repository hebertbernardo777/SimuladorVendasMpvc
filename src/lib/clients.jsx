import clients from "axios";

export const api = clients.create({
  baseURL: "/api/carteiraclientes",
  headers: {
    "Content-Type": "application/json",
  },
});

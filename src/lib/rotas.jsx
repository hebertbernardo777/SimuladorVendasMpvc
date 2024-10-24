import clients from "axios";
export const api = clients.create({
  baseURL: "http://appmpvc.com.br:3333/rotas",
  headers: {
    "Content-Type": "application/json",
  },
});

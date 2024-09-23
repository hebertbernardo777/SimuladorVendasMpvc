import products from 'axios';

export const api = products.create({
    baseURL: "http://appmpvc.com.br:3333/tabela",
    headers: {
        "Content-Type": "application/json",
    }
})
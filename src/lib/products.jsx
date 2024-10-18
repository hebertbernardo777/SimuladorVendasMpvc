import products from 'axios';

export const api = products.create({
    baseURL: "/api/tabela",
    headers: {
        "Content-Type": "application/json",
    }
})
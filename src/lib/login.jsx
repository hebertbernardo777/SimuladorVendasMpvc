import login from 'axios';

export const api = login.create({
    baseURL: import.meta.env.VITE_API_URL_LOGIN, // Use import.meta.env para acessar variáveis de ambiente no Vite
});

if (!import.meta.env.VITE_API_URL_LOGIN) {
    console.error("A variável de ambiente VITE_API_URL_LOGIN não está definida.");
}

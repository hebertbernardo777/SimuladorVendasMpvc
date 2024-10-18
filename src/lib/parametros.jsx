import parametros from 'axios';

export const api = parametros.create({
    baseURL: "/api/parametros",
    headers: {
        "Content-Type": "application/json",
    }
    
})
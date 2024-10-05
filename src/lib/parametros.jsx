import parametros from 'axios';

export const api = parametros.create({
    baseURL: "http://appmpvc.com.br:3333/parametros",
    headers: {
        "Content-Type": "application/json",
    }
    
})
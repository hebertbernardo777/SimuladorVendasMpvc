import login from 'axios';

export const api = login.create({
    baseURL: "http://appmpvc.com.br:3333/login",
    
})
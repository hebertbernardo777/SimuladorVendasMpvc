import login from 'axios';

export const api = login.create({
    baseURL: process.env.REACT_APP_API_URL_LOGIN,
});

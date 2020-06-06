import axios from 'axios'
import store from "./store";

const axiosProjet = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

axiosProjet.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params['api_key'] = 'e076ffa394d2275c4eedb77f080caece';
    config.params['language'] = 'fr';
    return config;
});

const axiosNode = axios.create({
    baseURL: 'http://localhost:3000/api'
});
axiosNode.interceptors.request.use(
    config => {
        const token = store.getters['user/jwtToken'];
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export {axiosProjet, axiosNode}
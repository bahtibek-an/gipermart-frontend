import axios from "axios";
import { getCookie, setCookie } from "../helper";

export const API_URL = "https://api.gipermart.uz/";

const $host = axios.create({
    baseURL: API_URL
});

$host.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if(!token) return config;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

$host.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const refreshToken = getCookie("refreshToken");
            const response = await $host.post("api/v1/token/refresh/" , {refresh: refreshToken});
            localStorage.setItem('accessToken', response.data.access);
            return $host.request(originalRequest);
        } catch (error) {
            setCookie("refreshToken", "", 0);
            localStorage.removeItem("accessToken");
            console.error(error);
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});

export default $host;
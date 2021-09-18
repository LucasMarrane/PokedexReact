import axios from "axios";

export function Api() {
    const axiosInstance = axios;
    axiosInstance.interceptors.request.use((config) => {
        localStorage.setItem("data", new Date(Date.now()).toString());
        return config;
    })
    axiosInstance.create({ baseURL: "https://pokeapi.co/api/v2/" });
    return axiosInstance;
}
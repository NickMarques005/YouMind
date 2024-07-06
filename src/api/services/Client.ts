import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import USE_ENV from "../constants/server_url/ServerUrl";

const { fullApiServerUrl } = USE_ENV();

const api = axios.create({
    baseURL: fullApiServerUrl
});

api.interceptors.request.use(async (config) => {
    const storedData = await AsyncStorage.getItem('@AuthData');
    if (storedData) {
        const { accessToken } = JSON.parse(storedData);
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) { // Verifica se é um erro de token expirado
        originalRequest._retry = true;
        const storedData = await AsyncStorage.getItem('@AuthData');
        if (storedData !== null) {
            const { refreshToken } = JSON.parse(storedData);
            const refreshTokenResponse = await axios.post(`${fullApiServerUrl}refreshToken`, { refreshToken });
            if (refreshTokenResponse.data) {
                const data = refreshTokenResponse.data;
                await AsyncStorage.setItem('@AuthData', JSON.stringify({ accessToken: data.accessToken, refreshToken }));
                console.log("Novo token: ", data);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                return api(originalRequest); // Repete a requisição original com o novo token
            }
            else {
                console.log("Houve algum erro ao atualizar accessToken!");
                return;
            }
        }
        else {
            console.log("Não há token em Async Storage");
        }

    }
    else{
        console.log("Não há erro de token expirado...");
    }
    return Promise.reject(error);
});

export default api;
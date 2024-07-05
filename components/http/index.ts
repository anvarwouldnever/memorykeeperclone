import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: 'https://memorykeeperbackend-b83d0577c534.herokuapp.com/api'
})

$api.interceptors.request.use(async(config) => {
    try {
        const token = await AsyncStorage.getItem('token'); // Получаем токен из AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Устанавливаем заголовок авторизации
        }
    } catch (error) {
        console.error('Ошибка при получении токена из AsyncStorage:', error);
    }
    return config;
})

export default $api
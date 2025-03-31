import axios, { AxiosError } from "axios";
import { getTokenFromSecureStore, storeTokens } from '@/scripts/jwt';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await getTokenFromSecureStore("accessToken");
    const refreshToken = await getTokenFromSecureStore("refreshToken");

    if (accessToken) config.headers["accessToken"] = accessToken;
    if (refreshToken) config.headers["refreshToken"] = refreshToken;

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers['newaccesstoken'];
    // console.log(response);

    if (newAccessToken && newAccessToken != 'null')
      storeTokens(newAccessToken, null);

    return response;
  },
  async (error) => {
    // console.log(error.response);

    if (error.response?.status === 403) {
      const newAccessToken = error.response?.accessToken;
      if (newAccessToken)
        storeTokens(newAccessToken, null);
    }

    return Promise.reject(error);
  }
);

export default {
  auth: async (authData) => {
    try {
      const response = await api.post(`/auth/sign_in`, authData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        throw new Error(error.response?.status || null);
      throw new Error("Неизвестная ошибка");
    }
  },
  doctorName: async () => {
    try {
      const response = await api.get(`/doctor/get/`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        throw new Error(error.response?.status || null);
      throw new Error("Неизвестная ошибка");
    }
  },
  getPatients: async () => {
    try {
      const response = await api.get(`/doctor/patients`);
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.status || 'Неизвестная ошибка');
      }
      throw new Error('Неизвестная ошибка');
    }
  },
  registerPatient: async (registrationData) => {
    try {
      const response = await api.post('/doctor/sign_up', registrationData);
      return response.data;  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.status || 'Неизвестная ошибка');
      }
      throw new Error('Неизвестная ошибка');
    }
  },
};

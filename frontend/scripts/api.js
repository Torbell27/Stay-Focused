import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

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
  doctorName: async (userId) => {
    try {
      const response = await api.get(`/doctor/get/${userId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        throw new Error(error.response?.status || null);
      throw new Error("Неизвестная ошибка");
    }
  },
  getPatients: async (doctorId) => {
    try {
      const response = await api.get(`/doctor/${doctorId}/patients`);
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

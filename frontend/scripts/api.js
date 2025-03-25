import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

export default {
  auth: async (authData) => {
    try {
      const response = await api.post(`http://localhost:5000/adhd-support-app/api/auth/sign_in`, authData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) throw new Error(error.response?.status || null);
      throw new Error("Неизвестная ошибка");
    }
  },
};


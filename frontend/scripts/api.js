import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export default {
  test() {
    return api.get("/test/get");
  },
};

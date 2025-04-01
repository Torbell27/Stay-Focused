import * as SecureStore from "expo-secure-store";

const storeTokenInSecureStore = async (name, token) => {
  try {
    await SecureStore.setItemAsync(name, token);
  } catch (error) {
    console.log("Ошибка сохранения токенов в SecureStore:", error);
  }
};

const getTokenFromSecureStore = async (key) => {
  try {
    const token = await SecureStore.getItemAsync(key);
    if (token) return token;
    console.log(`Токен с ключом ${key} не найден.`);
  } catch (error) {
    console.log("Ошибка при получении токена из SecureStore:", error);
  }
};

export { storeTokenInSecureStore, getTokenFromSecureStore };

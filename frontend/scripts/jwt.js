import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

export const storeTokens = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    console.log('Токены успешно сохранены');
  } catch (error) {
    console.error('Ошибка сохранения токенов:', error);
  }
};

export const getTokenFromSecureStore = async (key) => {
    try {
      const token = await SecureStore.getItemAsync(key);
      if (token) {
        return token;
      }
      console.error(`Токен с ключом ${key} не найден.`);
      return null;
    } catch (error) {
      console.error('Ошибка при получении токена из SecureStore:', error);
      return null;
    }
  };

export const getIdFromToken = async () => {
    const token = await getTokenFromSecureStore('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.userId;
      } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return null;
      }
    }
    return null;
  };
  
export const getRoleFromToken = async () => {
  const token = await getTokenFromSecureStore('accessToken');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.userRole;
    } catch (error) {
      console.error('Ошибка декодирования токена:', error);
      return null;
    }
  }
  return null;
};
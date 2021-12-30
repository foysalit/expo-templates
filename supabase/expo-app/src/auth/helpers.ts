import * as SecureStore from "expo-secure-store";

export const AUTH_USER_KEY = "auth.user";

export const getAuthToken = () => SecureStore.getItemAsync(AUTH_USER_KEY);
export const setAuthToken = (token: string) => SecureStore.setItemAsync(AUTH_USER_KEY, token);
export const deleteAuthToken = () => SecureStore.deleteItemAsync(AUTH_USER_KEY);

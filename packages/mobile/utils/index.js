import * as SecureStore from "expo-secure-store";

export const saveUserData = async (userData) => {
  await SecureStore.setItemAsync("user_data", JSON.stringify(userData));
};

export const getUserData = async () => {
  const userData = await SecureStore.getItemAsync("user_data");
  return JSON.parse(userData);
};

export const removeUserData = async () => {
  await SecureStore.deleteItemAsync("user_data");
};

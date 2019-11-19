import AsyncStorage from '@react-native-community/async-storage'
// import { LOCAL_STORAGE_LABLES } from "../constants";
class LocalStorage {
  static storeToken = async token => {
    await AsyncStorage.setItem("TOKEN", token);
  };
  static getToken = async () => {
    return await AsyncStorage.getItem("TOKEN");
  };
  static clearToken = async () => {
    return await AsyncStorage.removeItem("TOKEN");
  };
}

export { LocalStorage };

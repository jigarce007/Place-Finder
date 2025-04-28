import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveHistory = async (history) => {
  try {
    await AsyncStorage.setItem("searchHistory", JSON.stringify(history));
  } catch (e) {
    console.error("Error saving history:", e);
  }
};

export const getHistory = async () => {
  try {
    const history = await AsyncStorage.getItem("searchHistory");
    return history != null ? JSON.parse(history) : [];
  } catch (e) {
    console.error("Error fetching history:", e);
    return [];
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'search_history';
const MAX_HISTORY = 20;

export type PlaceHistoryItem = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId: string;
};

export const loadSearchHistory = async (): Promise<PlaceHistoryItem[]> => {
  const json = await AsyncStorage.getItem(HISTORY_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveSearchHistory = async (newPlace: PlaceHistoryItem) => {
  const existing = await loadSearchHistory();

  // Remove duplicates using placeId (most reliable)
  const deduped = existing.filter(
    item => item.placeId !== newPlace.placeId
  );

  const updated = [newPlace, ...deduped].slice(0, MAX_HISTORY);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const clearSearchHistory = async () => {
  await AsyncStorage.removeItem(HISTORY_KEY);
}
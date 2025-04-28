import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { loadSearchHistory } from '../services/searchHistoryService';
import { clearSearchHistory } from '../services/searchHistoryService';
import { Place } from '../types/Place';
import HistoryItem from '../components/HistoryItem';
import ClearHistoryButton from '../components/ClearHistoryButton';

const HistoryScreen: React.FC = ({ navigation }: any) => {
    const [history, setHistory] = useState<Place[]>([]);
    
    useFocusEffect(
        React.useCallback(() => {
          const loadHistory = async () => {
            const storedHistory = await loadSearchHistory();
            setHistory(storedHistory);
          };
          loadHistory();
        }, [])
      );

      const handleHistorySelection = (place: Place) => {
        navigation.navigate('Search', { selectedPlace: place });
    };

    const handleClearHistory = async () => {
        await clearSearchHistory();
        setHistory([]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search History</Text>
            <FlatList
                data={history}
                contentContainerStyle={{ paddingBottom: 80 }} 
                renderItem={({ item }) => (
                  <HistoryItem place={item} onSelect={handleHistorySelection} />
                  )}
                keyExtractor={(item, index) => index.toString()}
            />
            <ClearHistoryButton onClear={handleClearHistory} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default HistoryScreen;
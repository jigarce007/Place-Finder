import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { loadSearchHistory } from '../services/searchHistoryService';
import { clearSearchHistory } from '../services/searchHistoryService';
import { Place } from '../types/Place';
import HistoryItem from '../components/HistoryItem';
import ClearHistoryButton from '../components/ClearHistoryButton';
import { hstyles } from '../styles/HistoryScreen.styles';

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
        <View style={hstyles.container}>
            <Text style={hstyles.title}>Search History</Text>
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

export default HistoryScreen;
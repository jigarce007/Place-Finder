import React, { useState } from 'react';
import { ToastAndroid, Platform } from 'react-native';
import { useFocusEffect,useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadSearchHistory } from '../services/searchHistoryService';
import { clearSearchHistory } from '../services/searchHistoryService';

const HistoryScreen: React.FC = ({ navigation }: any) => {
    const [history, setHistory] = useState<Array<{ name: string; address: string; latitude: number; longitude: number, placeId?: string;
        photoUrl?: string;  }>>([]);
    
    useFocusEffect(
        React.useCallback(() => {
          const loadHistory = async () => {
            const storedHistory = await loadSearchHistory();
            setHistory(storedHistory);
          };
          loadHistory();
        }, [])
      );


    const handleHistorySelection = (place: { name: string; address: string; latitude: number; longitude: number }) => {
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
                    <TouchableOpacity onPress={() => handleHistorySelection(item)} style={styles.historyItem}>
                      {item.photoUrl ? (
                        <Image source={{ uri: item.photoUrl }} style={styles.thumbnail} />
                      ) : (
                        <View style={[styles.thumbnail, styles.placeholderIcon]}>
                          <Text>📍</Text>
                        </View>
                      )}
                      <View style={styles.textContainer}>
                        <Text style={styles.historyName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.historyAddress} numberOfLines={1}>{item.address}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                keyExtractor={(item, index) => index.toString()}
            />
             <View style={styles.clearButtonContainer}>
                <TouchableOpacity onPress={handleClearHistory} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear History</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop:50,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    clearButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 1,
      },
      
      clearButton: {
        backgroundColor: '#ff4d4d',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
      },
      
      clearButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
    historyItem: {
        flexDirection: 'row',            // Row layout
        alignItems: 'center',            // Vertically center
        padding: 5,
        marginBottom: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        height: 80,                      // Fixed height
      },
      
      thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 35,
        marginRight: 5,
      },
      
      placeholderIcon: {
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      textContainer: {
          flex: 1,
        marginStart:5,  // Take up remaining space
        flexDirection: 'column',
        justifyContent: 'center',
      },
      
      historyName: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      
      historyAddress: {
        fontSize: 12,
        color: '#777',
      },
});

export default HistoryScreen;
import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { Place } from '../types/Place';

interface HistoryItemProps {
  place: Place;
  onSelect: (place: Place) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ place, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(place)} style={styles.historyItem}>
      {place.photoUrl ? (
        <Image source={{ uri: place.photoUrl }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.placeholderIcon]}>
          <Text>📍</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.historyName} numberOfLines={1}>{place.name}</Text>
        <Text style={styles.historyAddress} numberOfLines={1}>{place.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    height: 80,
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
    marginStart: 5,
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

export default HistoryItem;
import React,{memo} from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { Place } from '../types/Place';
import { hstyles } from '../styles/HistoryScreen.styles';

interface HistoryItemProps {
  place: Place;
  onSelect: (place: Place) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ place, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(place)} style={hstyles.historyItem}  activeOpacity={0.7}  accessibilityRole="button"  accessibilityLabel={`Select ${place.name}`}>
      {place.photoUrl ? (
        <Image source={{ uri: place.photoUrl }} style={hstyles.thumbnail} />
      ) : (
        <View style={[hstyles.thumbnail, hstyles.placeholder]}>
          <Text style={hstyles.placeholderIcon}>📍</Text>
        </View>
      )}
      <View style={hstyles.textContainer}>
        <Text style={hstyles.historyName} numberOfLines={1}>{place.name}</Text>
        <Text style={hstyles.historyAddress} numberOfLines={1}>{place.address}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default memo(HistoryItem);
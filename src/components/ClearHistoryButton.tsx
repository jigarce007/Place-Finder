import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { hstyles } from '../styles/HistoryScreen.styles';

interface ClearHistoryButtonProps {
  onClear: () => void;
}

const ClearHistoryButton: React.FC<ClearHistoryButtonProps> = ({ onClear }) => {
  return (
    <View style={hstyles.clearButtonContainer}>
      <TouchableOpacity onPress={onClear} style={hstyles.clearButton}>
        <Text style={hstyles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClearHistoryButton;
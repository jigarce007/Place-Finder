import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface ClearHistoryButtonProps {
  onClear: () => void;
}

const ClearHistoryButton: React.FC<ClearHistoryButtonProps> = ({ onClear }) => {
  return (
    <View style={styles.clearButtonContainer}>
      <TouchableOpacity onPress={onClear} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ClearHistoryButton;
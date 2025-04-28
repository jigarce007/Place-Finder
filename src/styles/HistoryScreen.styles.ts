import { StyleSheet } from "react-native";

export const hstyles = StyleSheet.create({
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
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        height: 80,
      },
      thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
      },
      placeholder: {
        backgroundColor: '#e0e0e0',
      },
      placeholderIcon: {
        fontSize: 24,
      },
      textContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      historyName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      },
      historyAddress: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
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
});
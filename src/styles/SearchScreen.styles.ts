import { StyleSheet } from "react-native";

export const stylis = StyleSheet.create({
    container: {
        flex: 1
    },
    searchContainer: {
        position: 'absolute',
        top: 50,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'trasparent',
        zIndex: 1,
    },
    textInputContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
    },
    textInput: {
        color: 'black',
        fontSize: 15,
        padding: 8,
        width: '80%',
        height: 40,
        paddingRight: 40,  
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    detailsCard: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    detailsTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    detailsDescription: {
        fontSize: 14,
        color: 'gray',
    },
    image: {
        width: 200,
        height: 100,
        borderRadius: 5,
        marginBottom: 6,
    },
    clearButton: {
        position: 'absolute',
        right: 7,
        top: 8,
        padding: 5,
        zIndex: 1, // Make sure it sits above text input
      },
      
      clearIcon: {
        width: 20,
        height: 20,
        tintColor: 'gray', // Optional: to make icon match theme
      },
});
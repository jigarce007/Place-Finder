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
        borderRadius: 10,
        overflow: 'hidden',
        height: 180,
        zIndex: 2,
      },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      
      imageStyle: {
        width: '100%',
        height: '100%',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent dark overlay
        padding: 5,
      },
      
      detailsTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      
      detailsDescription: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
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
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
        backgroundColor: 'black',
        zIndex: 1,
    },
    textInputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    textInput: {
        color: 'black',
        fontSize: 18,
        padding: 10,
        width: '100%',
        height: 45,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    detailsCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    detailsTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
});
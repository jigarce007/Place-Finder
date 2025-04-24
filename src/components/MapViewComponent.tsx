import { types } from "@babel/core";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView,{Marker} from "react-native-maps";

type Props = {
    region: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number
    };
    markerTitle: string;
    markerDescription: string;
};

const MapViewComponent = ({ region, markerTitle, markerDescription }: Props) => {
    return (
        <MapView style={styles.map} region={region}>
            <Marker coordinate={region} title={markerTitle} description={markerDescription} />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
      flex: 1,
    },
});
  
export default MapViewComponent;
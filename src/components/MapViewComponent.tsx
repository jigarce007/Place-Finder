import React from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { stylis } from '../styles/SearchScreen.styles';

interface MapViewComponentProps {
  region: Region;
  placeDetails: { name: string; address: string } | null;
  mapRef: React.RefObject<MapView>;
}
const MapViewComponent: React.FC<MapViewComponentProps> = ({ region, placeDetails, mapRef }) => {
    return (
      <MapView 
        ref={mapRef} 
        style={stylis.map} 
        initialRegion={region}  // Ensure this updates the map region correctly
        >
            {placeDetails && 
            (   
        <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            title={placeDetails.name}
            description={placeDetails.address}
            pinColor="#be1d2e"
        >
  </Marker>
)}
      </MapView>
    );
  };
export default MapViewComponent;
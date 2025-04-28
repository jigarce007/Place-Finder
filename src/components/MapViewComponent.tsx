import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { stylis } from '../styles/SearchScreen.styles';

interface MapViewComponentProps {
  region: Region;
  placeDetails: { name: string; address: string } | null;
  mapRef: React.RefObject<MapView>;
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({ region, placeDetails, mapRef }) => {
  const animatedLatitude = useRef(new Animated.Value(region.latitude)).current;
  const animatedLongitude = useRef(new Animated.Value(region.longitude)).current;
  
  const [currentLatitude, setCurrentLatitude] = useState(region.latitude);
  const [currentLongitude, setCurrentLongitude] = useState(region.longitude);

  useEffect(() => {
    if (mapRef.current && region) {
      mapRef.current.animateToRegion(region, 1000);

    Animated.sequence([
      Animated.timing(animatedLatitude, {
        toValue: region.latitude + 0.002, 
        duration: 200, 
        useNativeDriver: false,
      }),
      Animated.timing(animatedLatitude, {
        toValue: region.latitude, 
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.sequence([
      
      Animated.timing(animatedLongitude, {
        toValue: region.longitude + 0.002,
        duration: 200, 
        useNativeDriver: false,
      }),
      Animated.timing(animatedLongitude, {
        toValue: region.longitude, 
        duration: 400, 
        useNativeDriver: false,
      }),
    ]).start();
    }
  }, [region]);

  useEffect(() => {
    animatedLatitude.addListener(({ value }) => setCurrentLatitude(value));
    animatedLongitude.addListener(({ value }) => setCurrentLongitude(value));

    // Cleanup listeners when component unmounts
    return () => {
      animatedLatitude.removeAllListeners();
      animatedLongitude.removeAllListeners();
    };
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={stylis.map}
      region={region}
      showsUserLocation
      showsMyLocationButton
      zoomControlEnabled
      loadingEnabled
    >
      {placeDetails && (
        <Marker
          coordinate={{
            latitude: currentLatitude, // Use state for latitude
            longitude: currentLongitude, // Use state for longitude
          }}
          title={placeDetails.name}
          description={placeDetails.address}
          pinColor="#be1d2e"
          tracksViewChanges={false}
          identifier="selectedPlace"
          anchor={{ x: 0.5, y: 1 }}
          
        />
      )}
    </MapView>
  );
};

export default MapViewComponent;
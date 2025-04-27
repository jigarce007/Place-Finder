import React, { createContext, useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet,Text,Image,TouchableOpacity,ImageBackground } from 'react-native';
import { GooglePlaceData, GooglePlacesAutocomplete, GooglePlaceDetail,GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import MapViewComponent from '../components/MapViewComponent'
import Mapview, { Marker, Region } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylis } from '../styles/SearchScreen.styles';
import { loadSearchHistory, saveSearchHistory } from '../services/searchHistoryService'; 

const apiKey = 'AIzaSyC2xZMs5URAtzyCbTjDZi4HYxaKTOrL6F4';
let photoUrl;
interface ExtendedGooglePlaceDetail extends GooglePlaceDetail {
    photos?: { photo_reference: string }[];
  }
const SearchScreen: React.FC = () => { 
    const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>(null);
    const mapRef = useRef<Mapview>(null);
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [placeDetails, setPlaceDetails] = useState<{
        name: string,
        address: string,
        photoUrl: string
    } | null>(null)

    const [searchText, setSearchText] = useState('');
    const [history, setHistory] = useState<Array<{ name: string; address: string; latitude: number; longitude: number,placeId: string;
        photoUrl?: string; }>>([]);

    // Load history from AsyncStorage only once when the component mounts
    useEffect(() => {
      const loadHistory = async () => {
        const storedHistory = await loadSearchHistory();
        setHistory(storedHistory);
      };
      loadHistory();
    }, []);

    const route = useRoute();

useEffect(() => {
  const selectedPlace = (route.params as any)?.selectedPlace;
    if (selectedPlace) {
        googlePlacesRef.current?.clear();            
        googlePlacesRef.current?.setAddressText('');   
        setSearchText(''); 
    setRegion({
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    mapRef.current?.animateToRegion({
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);

    setPlaceDetails({
      name: selectedPlace.name,
      address: selectedPlace.address,
      photoUrl: selectedPlace.photoUrl || ''    
    });
  }
}, [route.params]);

    const handlePlaceSelection = async (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        if (!details) return;
      
        const extendedDetails = details as ExtendedGooglePlaceDetail;
        const { geometry, formatted_address, name, place_id } = details;
        const photoReference = extendedDetails.photos?.[0]?.photo_reference;
      
        photoUrl = photoReference
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
          : '';
      
        const selectedRegion: Region = {
          latitude: geometry.location.lat,
          longitude: geometry.location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
      
        setRegion(selectedRegion);
        setPlaceDetails({ name, address: formatted_address, photoUrl });
      
        const newPlace = {
          name,
          address: formatted_address,
          latitude: geometry.location.lat,
          longitude: geometry.location.lng,
            placeId: place_id,
            photoUrl: photoUrl,
        };
      
        await saveSearchHistory(newPlace); // ✅ Save only unique entries
        const freshHistory = await loadSearchHistory();
        setHistory(freshHistory);          // ✅ UI always in sync
    };
    
    const handleClearSearch = () => {
        googlePlacesRef.current?.clear();             // clears suggestions
        googlePlacesRef.current?.setAddressText('');  // clears input field
        setSearchText('');                            // optional, in case you're using it elsewhere
        setPlaceDetails(null);
    }

  return (
      <View style={styles.container}>
          <View style={stylis.searchContainer}>
              <GooglePlacesAutocomplete
        ref = {googlePlacesRef}
        placeholder="Search for places"
        onPress={handlePlaceSelection}
        query={{
          key: 'AIzaSyC2xZMs5URAtzyCbTjDZi4HYxaKTOrL6F4',
          language: 'en',
        }}
                  fetchDetails={true}
                  textInputProps={{
                    value: searchText, // Bind the input value to the state
                    onChangeText: (text) => setSearchText(text), // Handle text input change
                }}
            
                  styles={{
                      textInputContainer: stylis.textInputContainer,
                      textInput: stylis.textInput,
                  }}
              />
              {searchText.length > 0 && (
                    <TouchableOpacity onPress={handleClearSearch} style={stylis.clearButton}>
                        <Image
                        source={require('../../assets/ic_close.png')}
                        style={stylis.clearIcon}
                        resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
              </View>
          <Mapview
              ref={mapRef} 
              style={stylis.map}
              region={region}
            >
              {/* {placeDetails && (
                  <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                      title= {placeDetails.name}
                      description={placeDetails.address}
                    >
                  </Marker>
              )} */}
               {placeDetails && (
                <Marker
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                title={placeDetails.name}
                description={placeDetails.address}
                pinColor="#be1d2e"
                />
            )}
          </Mapview>

          {placeDetails && (
  <View style={stylis.detailsCard}>
    {placeDetails.photoUrl ? (
      <ImageBackground
        source={{ uri: placeDetails.photoUrl }}
        style={stylis.imageBackground}
        imageStyle={stylis.imageStyle}
      >
        <View style={stylis.overlay}>
          <Text style={stylis.detailsTitle}>{placeDetails.name}</Text>
          <Text style={stylis.detailsDescription}>{placeDetails.address}</Text>
        </View>
      </ImageBackground>
    ) : (
      <View style={[stylis.imageBackground, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff' }}>No Image Available</Text>
      </View>
    )}
  </View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default SearchScreen;
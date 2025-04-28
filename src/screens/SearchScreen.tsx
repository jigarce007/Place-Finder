import React, {useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet,Text,Image,TouchableOpacity,ImageBackground } from 'react-native';
import { GooglePlaceData, GooglePlacesAutocomplete, GooglePlaceDetail,GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import Mapview, { Marker, Region } from 'react-native-maps';
import { stylis } from '../styles/SearchScreen.styles';
import { loadSearchHistory, saveSearchHistory } from '../services/searchHistoryService'; 
import SearchBar from '../components/SearchBar';
import MapViewComponent from '../components/MapViewComponent';
import PlaceDetailsCard from '../components/PlaceDetailsCard';

const apiKey = 'AIzaSyC2xZMs5URAtzyCbTjDZi4HYxaKTOrL6F4';
let photoUrl;
interface ExtendedGooglePlaceDetail extends GooglePlaceDetail {
    photos?: { photo_reference: string }[];
  }
const SearchScreen: React.FC = () => { 
    const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>(null);
    const mapRef = useRef<Mapview>(null);
    const route = useRoute();
    const selectedPlace = route.params?.selectedPlace;
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [placeDetails, setPlaceDetails] = useState<any>(null); 

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

    useEffect(() => {
        
        if (selectedPlace) {
    
          setRegion({
            latitude: selectedPlace.latitude,
            longitude: selectedPlace.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setPlaceDetails({
            name: selectedPlace.name,
            address: selectedPlace.address,
            photoUrl: selectedPlace.photoUrl || ''
          });
    
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }, 1500);  
          }
        }
      }, [selectedPlace]);// Dependency on route.params to handle place changes

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

    useEffect(() => {
        if (mapRef.current && region) {
            mapRef.current.animateToRegion({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            }, 1000);
        }
    }, [region]);  // This effect runs when the region state is updated
    
  return (
      <View style={stylis.container}>
          <View style={stylis.searchContainer}>
          <SearchBar
            googlePlacesRef={googlePlacesRef}
            searchText={searchText}  // Use state for the search text
            onChangeText={(text) => setSearchText(text)}
            onPlaceSelected={handlePlaceSelection}
            onClear={handleClearSearch}
            />
        </View>
        <MapViewComponent mapRef={mapRef} region={region} placeDetails={placeDetails} />
          {placeDetails && (
           
                <PlaceDetailsCard placeDetails={placeDetails} />
           
)}
    </View>
  );
};

export default SearchScreen;
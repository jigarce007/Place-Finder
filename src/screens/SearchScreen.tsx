import React, {useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View} from 'react-native';
import { GooglePlaceData, GooglePlaceDetail,GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import Mapview, {Region } from 'react-native-maps';
import { stylis } from '../styles/SearchScreen.styles';
import { loadSearchHistory, saveSearchHistory } from '../services/searchHistoryService'; 
import SearchBar from '../components/SearchBar';
import MapViewComponent from '../components/MapViewComponent';
import PlaceDetailsCard from '../components/PlaceDetailsCard';
import { GOOGLE_API_KEY } from '../config'; 
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
      }, [selectedPlace]);

    const handlePlaceSelection = async (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        if (!details) return;
      
        const extendedDetails = details as ExtendedGooglePlaceDetail;
        const { geometry, formatted_address, name, place_id } = details;
        const photoReference = extendedDetails.photos?.[0]?.photo_reference;
      
        photoUrl = photoReference
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`
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
      
        await saveSearchHistory(newPlace); 
        const freshHistory = await loadSearchHistory();
        setHistory(freshHistory);        
    };
    
    const handleClearSearch = () => {
        googlePlacesRef.current?.clear();            
        googlePlacesRef.current?.setAddressText('');  
        setSearchText('');                            
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
    }, [region]); 
    
  return (
      <View style={stylis.container}>
          <View style={stylis.searchContainer}>
          <SearchBar
            googlePlacesRef={googlePlacesRef}
            searchText={searchText} 
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
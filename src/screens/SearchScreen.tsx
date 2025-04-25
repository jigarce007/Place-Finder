import React,{useState,useRef} from 'react';
import { View, StyleSheet,Text,Image,TouchableOpacity } from 'react-native';
import { GooglePlaceData, GooglePlacesAutocomplete, GooglePlaceDetail,GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import MapViewComponent from '../components/MapViewComponent'
import Mapview,{Marker,Region } from 'react-native-maps';
import {stylis} from '../styles/SearchScreen.styles';

const apiKey = 'AIzaSyC2xZMs5URAtzyCbTjDZi4HYxaKTOrL6F4';
interface ExtendedGooglePlaceDetail extends GooglePlaceDetail {
    photos?: { photo_reference: string }[];
  }
const SearchScreen: React.FC = () => { 
    const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>();
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
    
    const handlePlaceSelection = (data : GooglePlaceData, details : GooglePlaceDetail | null) => {
        console.log(data, details);
        if (details) {
            const extendedDetails = details as ExtendedGooglePlaceDetail;
            const { geometry, formatted_address, name } = details;
            const photoReference = extendedDetails.photos?.[0]?.photo_reference;
          
            const photoUrl = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}` : '';
            console.log(`Photo URL:::::::::: ${photoUrl}`);
            const selectedRegion : Region = {
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }

            setRegion(selectedRegion);
            setPlaceDetails({
                name,
                address: formatted_address,
                photoUrl
            })
        }
    }

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
              style={stylis.map}
              region={region}
            >
              {placeDetails && (
                  <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                      title= {placeDetails.name}
                      description={placeDetails.address}
                    >
                  </Marker>
              )}
          </Mapview>

          {placeDetails && (
    <View style={stylis.detailsCard}>
        <Text style={stylis.detailsTitle}>{placeDetails.name}</Text>
        <Text style={stylis.detailsDescription}>{placeDetails.address}</Text>
        {placeDetails.photoUrl ? (
            <Image
                source={{ uri: placeDetails.photoUrl }}
                style={stylis.image}
                resizeMode="cover"
            />
        ) : (
            <Text>No Image Available</Text>
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
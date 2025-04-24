import React,{useState,useEffect} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { GooglePlaceData, GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapViewComponent from '../components/MapViewComponent'
import Mapview,{Marker,Region } from 'react-native-maps';
import {stylis} from '../styles/SearchScreen.styles';

const SearchScreen : React.FC = () => { 
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [placeDetails, setPlaceDetails] = useState<{
        name: string,
        address: string,
    } | null>(null)
    
    const handlePlaceSelection = (data : GooglePlaceData, details : GooglePlaceDetail | null) => {
        console.log(data, details);
        if (details) {
            const { geometry, format_address, name } = details;
           
            const selectedRegion : Region = {
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }

            setRegion(selectedRegion);
            setPlaceDetails({
                name,
                address: format_address,
            })
        }
    }

  return (
      <View style={styles.container}>
          <View style={stylis.searchContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search for places"
        onPress={handlePlaceSelection}
        query={{
          key: 'AIzaSyC2xZMs5URAtzyCbTjDZi4HYxaKTOrL6F4',
          language: 'en',
        }}
                  fetchDetails={true}
                  styles={{
                      textInputContainer: stylis.textInputContainer,
                      textInput: stylis.textInput,
                  }}
              />
              </View>
          <Mapview
              style={stylis.map}
              region={region}
              onRegionChangeComplete={(newRegion : Region) => setRegion(newRegion)}
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
                  <Text>{placeDetails.address}</Text>
                  </View>
          )
        }
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
import React, { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { stylis } from '../styles/SearchScreen.styles';

const apiKey = 'AIzaSyC2xZMs5URAtzyCbTjDZi4HYxaKTOrL6F4';

interface SearchBarProps {
  googlePlacesRef: React.RefObject<GooglePlacesAutocompleteRef>;
  searchText: string;
  onChangeText: (text: string) => void;
  onPlaceSelected: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  googlePlacesRef,
  searchText,
  onChangeText,
  onPlaceSelected,
  onClear,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Search for places"
        fetchDetails
        query={{
          key: apiKey,
          language: 'en',
        }}
        textInputProps={{
          value: searchText,
          onChangeText: onChangeText,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
        onPress={onPlaceSelected}
        styles={{
          textInputContainer: stylis.textInputContainer,
          textInput: stylis.textInput,
        }}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={onClear} style={stylis.clearButton}>
          <Image source={require('../../assets/ic_close.png')} style={stylis.clearIcon} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
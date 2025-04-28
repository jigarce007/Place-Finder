import React, { useState,memo,useCallback } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { stylis } from '../styles/SearchScreen.styles';
import { GOOGLE_API_KEY } from '../config';

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
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <View>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Search for places"
        fetchDetails
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        textInputProps={{
          value: searchText,
          onChangeText: onChangeText,
          onFocus: () => handleFocus,
          onBlur: () => handleBlur,
          placeholderTextColor: '#999',
          clearButtonMode: 'never',
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
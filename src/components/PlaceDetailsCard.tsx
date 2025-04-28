import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { stylis } from '../styles/SearchScreen.styles';

interface PlaceDetailsCardProps {
  placeDetails: { name: string; address: string; photoUrl: string } | null;
}

const PlaceDetailsCard: React.FC<PlaceDetailsCardProps> = ({ placeDetails }) => {
  if (!placeDetails) return null;

  return (
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
  );
};

export default PlaceDetailsCard;
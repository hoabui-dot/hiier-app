import { Entypo } from '@expo/vector-icons';
import { Center, Icon } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';

interface MapCustomProps {
  region: Region;
  setRegion: (region: Region) => void;
}
const MapCustom = ({ region, setRegion }: MapCustomProps) => {
  const mapView = useRef<MapView>(null);

  useEffect(() => {
    mapView.current?.animateToRegion(region as Region, 200);
  }, [region]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        style={styles.container}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        // region={region}
        onRegionChangeComplete={(region, details) => {
          if (Platform.OS === 'ios') {
            if (details.isGesture) {
              setRegion(region);
            }
          } else {
            setRegion(region);
          }
        }}
      />
      <Center style={styles.container}>
        <Icon as={Entypo} name={'location-pin'} size={10} color={'red.500'} />
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default MapCustom;

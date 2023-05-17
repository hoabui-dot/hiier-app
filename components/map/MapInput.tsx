import { ITheme, useTheme } from 'native-base';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';
import { GOOGLE_API_KEY } from '../../constants/ui';
import { geocoding } from '../../services/api/googleMapApi';

interface MapInputProps {
  onPress: (region: LatLng, formatted_address: string) => void;
  defaultValue?: string;
}
const MapInput = ({ onPress, defaultValue }: MapInputProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const ref = useRef<any>(null);

  useEffect(() => {
    if (defaultValue) {
      ref.current?.setAddressText(defaultValue);
    }
  }, []);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Search"
      onPress={async (data, details = null) => {
        const res = await geocoding(data.description);

        if (res) {
          onPress(
            {
              latitude: res.geometry.location.lat,
              longitude: res.geometry.location.lng,
            },
            res.formatted_address
          );
        }
      }}
      fetchDetails={true}
      query={{
        key: GOOGLE_API_KEY,
        language: 'vi',
      }}
      styles={
        styles
        //   {
        //   container: styles.container,
        //   textInput: {
        //     ...styles.textInput,
        //     borderColor: focus
        //       ? theme.colors.primary['400']
        //       : theme.colors.gray['200'],
        //   },
        // }
      }
      // renderRow={(rowData) => {
      //   const title = rowData.structured_formatting.main_text;
      //   const address = rowData.structured_formatting.secondary_text;
      //   return (
      //     <View>
      //       <Text style={{ fontSize: 14 }}>{title}</Text>
      //       <Text style={{ fontSize: 14 }}>{address}</Text>
      //     </View>
      //   );
      // }}
    />
  );
};

const makeStyles = ({ colors, sizes }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      backgroundColor: colors.white,
      color: colors.gray['500'],
      borderColor: colors.gray['200'],
      borderRadius: sizes.radius,
      borderWidth: 1,
    },
  });

export default MapInput;

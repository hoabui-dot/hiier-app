import { useState, useMemo, useEffect, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, ITheme, useTheme } from 'native-base';
import { RootStackScreenProps } from '../../../types/navigation';
import Header from '../../../components/Header';
import InputBase from '../../../components/Base/InputBase';
import TouchableIcon from '../../../components/TouchableIcon';
import ViewSection from '../../../components/ViewSection';
import ButtonBase from '../../../components/Base/ButtonBase';
import Loading from '../../../components/Loading';

import * as ExpoLocation from 'expo-location';
import {
  placeAutocomplete,
  placeDetailById,
  reverseGeocoding,
} from '../../../services/api/googleMapApi';
import Icons from '../../../utils/Icon/Icons';
import { debounce } from 'lodash';
import { Address, AddressSearchResult } from '../../../types/ui';
import { initAddress } from '../../../utils/defaultValue/common';

const AddressSearchScreen = ({ navigation, route }: any) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const [addressResult, setAddressResult] = useState<AddressSearchResult[]>([]);
  useEffect(() => {
    if (route.params?.placeDetail) {
      onChange(route.params?.placeDetail);
    }
  }, [route.params]);

  const [locationLoading, setLocationLoading] = useState(false);

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(status);
      return;
    }

    const location = await ExpoLocation.getCurrentPositionAsync({
      accuracy: ExpoLocation.Accuracy.Highest,
    });
    const res = await reverseGeocoding(location.coords);

    if (location && res) {
      setLocationLoading(false);
      const _address: Address = {
        ...initAddress,
        detail: res.formatted_address,
        location: location.coords,
      };
      navigation.navigate('Map', _address);
    }
    // setLocation(location);
  };

  const onChangeHandler = useCallback(
    debounce(async (val: string) => {
      const res = await placeAutocomplete(val);
      const _addressResult = res.map((val: any) => {
        return { description: val.description, placeId: val.place_id };
      });
      console.log(_addressResult);
      setAddressResult(_addressResult);
    }, 500),
    []
  );
  const onChange = async (val: string) => {
    onChangeHandler(val);
  };

  const handleNavigate = async ({
    placeId,
    description,
  }: AddressSearchResult) => {
    const res = await placeDetailById(placeId);
    const latitude = res.geometry.location.lat;
    const longitude = res.geometry.location.lng;
    const _address: Address = {
      ...initAddress,
      detail: description,
      location: {
        latitude,
        longitude,
      },
    };
    navigation.navigate('Map', _address);
  };

  return (
      <SafeAreaView style={styles.container}>
        <Header
          headerText="Add & Update Address"
          leftPress={() => navigation.goBack()}
          backButton
        />

        <View style={styles.buttonWrap}>
          <ButtonBase
            title={!locationLoading ? 'Use current location' : <Loading />}
            onPress={() => getCurrentLocation()}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputBase
            onChangeText={onChange}
            defaultValue={route.params?.placeDetail}
          />
        </View>
        <ViewSection padding={'none'}>
          {addressResult.map((it, id) => (
            <TouchableIcon
              key={id}
              title={it.description}
              onPress={() => handleNavigate(it)}
              iconLeft={<Icon as={Icons.Search} />}
              textStyle={styles.addressItem}
            />
          ))}
        </ViewSection>
      </SafeAreaView>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    inputWrap: {
      paddingHorizontal: sizes.padding * 2,
    },
    buttonWrap: {
      padding: sizes.padding * 2,
    },
    addressItem: {
      fontWeight: '400',
      fontSize: fontSizes.sm,
    },
  });

export default AddressSearchScreen;

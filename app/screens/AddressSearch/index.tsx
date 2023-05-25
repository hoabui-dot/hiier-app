import { useState, useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ITheme, useTheme } from 'native-base';
import Header from '../../../components/Header';
import ButtonBase from '../../../components/Base/ButtonBase';
import Loading from '../../../components/Loading';

import * as ExpoLocation from 'expo-location';
import { reverseGeocoding } from '../../../services/api/googleMapApi';
import { Address } from '../../../types/ui';
import { initAddress } from '../../../utils/defaultValue/common';

const AddressSearchScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

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
    </SafeAreaView>
  );
};

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonWrap: {
      padding: args.sizes.padding * 2,
    },
  });

export default AddressSearchScreen;

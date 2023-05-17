import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Region } from 'react-native-maps';
import { RootStackScreenProps } from '../../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, ITheme, useTheme } from 'native-base';
import MapCustom from '../../../components/map/MapCustom';
import AddressModal from '../../../components/map/AddressModal';
import { Address } from '../../../types/ui';
import ButtonBase from '../../../components/Base/ButtonBase';
import Header from '../../../components/Header';
import { Text } from 'react-native';
import { initRegion } from '../../../utils/defaultValue/common';
import { AddressApi } from '../../../services/api/address';
import { reverseGeocoding } from '../../../services/api/googleMapApi';

const MapScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [showModal, setShowModal] = useState<boolean>(false);


  const [address, setAddress] = useState<Address>(route.params);
  const [region, setRegion] = useState<Region>({
    ...initRegion,
    ...route.params.location,
  });
  const didMountRef = useRef(false);

  //Get formattedAddress by region
  const getFormattedAddress = async (_region: Region) => {
    
    const res = await reverseGeocoding(_region);
    setAddress({
      ...address,
      detail: res.formatted_address,
      location: _region,
    });
  };

  useEffect(() => {
    if (didMountRef.current) {
      getFormattedAddress(region);
    }
    didMountRef.current = true;
  }, [region]);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const submit = async () => {
    try {
      const res = await AddressApi.create(address);
      if (res) {
        Alert.alert(res.resource, res.message);
        navigation.navigate('AddressList');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMapNavigate = () => {
    navigation.navigate('AddressSearch', { placeDetail: address.detail });
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          headerText={'Pin Address'}
          leftPress={() => navigation.goBack()}
          backButton
        />
        <View style={styles.mapView}>
          <Center style={[styles.detail, styles.top]}>
            <TouchableOpacity
              style={styles.address}
              onPress={handleMapNavigate}
            >
              <Text style={styles.addressText}>{address.detail}</Text>
            </TouchableOpacity>
          </Center>
          <MapCustom region={region} setRegion={setRegion} />
          <Center style={styles.detail}>
            <ButtonBase
              title='Confirm'
              onPress={toggleShowModal}
              variant={'solid'}
              containerStyle={{ width: '100%' }}
            />
          </Center>
        </View>
      </SafeAreaView>
      <AddressModal
        showModal={showModal}
        setShowModal={toggleShowModal}
        address={address}
        setAddress={setAddress}
        submit={submit}
      />
    </>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    top: {
      top: 50,
      bottom: undefined,
    },
    detail: {
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
      padding: sizes.padding * 2,
      width: '100%',
    },
    detailInner: {
      flex: 1,
      width: sizes.full,
      backgroundColor: colors.white,
      borderRadius: sizes.radius,
      padding: sizes.padding * 2,
      borderWidth: 1,
      borderColor: colors.violet['100'],
    },
    mapView: {
      ...StyleSheet.absoluteFillObject,
      height: sizes.height,
    },
    address: {
      width: sizes.full,
      backgroundColor: colors.white,
      color: colors.gray['500'],
      padding: sizes.padding * 2,
      paddingVertical: sizes.padding,
      borderRadius: sizes.radius,
    },
    addressText: {
      fontSize: fontSizes.sm,
      lineHeight: fontSizes.sm * 1.5,
    },
  });

export default MapScreen;
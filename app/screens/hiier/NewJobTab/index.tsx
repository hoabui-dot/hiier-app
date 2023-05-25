import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Modal } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center } from 'native-base';
import { API_URL } from '../../../../services/api/urls';
import io from 'socket.io-client';
import { addAuthorizationHeader } from '../../../../services/token';
import { IJobInformation } from '../../../../types/ui';
import MapCustom from '../../../../components/map/MapCustom';
import { Region } from 'react-native-maps';
import Card from '../../../../components/Card';
import {
  DEFAULT_JOB_INFORMATION,
  initRegion,
} from '../../../../utils/defaultValue/common';
import SwipeButton from 'rn-swipe-button';
import { secretHashContext } from '../../DrawerMenu';

import { JOB_TAB, PURPLE_COLOR, WHITE_COLOR } from '../../../../constants/ui';
import { ITheme, useTheme } from 'native-base';

const { width, height } = Dimensions.get('screen');

const NewJobTab = ({ navigation, route }: any) => {
  const loginValue = useContext(secretHashContext);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [isJobModal, setIsJobModal] = useState<boolean>(false);
  const [jobInformation, setJobInformation] = useState<IJobInformation>(
    DEFAULT_JOB_INFORMATION
  );
  const [region, setRegion] = useState<any>({
    ...initRegion,
    ...route.params?.location,
  });

  addAuthorizationHeader(loginValue.token);
  const socket = io(API_URL.webSocket);

  useEffect(() => {
    if (loginValue.secretHash) {
      socket.emit('subscribe-direct-notification', loginValue.secretHash);
      socket.on('notification/' + loginValue.secretHash, (res) => {
        setJobInformation(res);
        setIsJobModal(true);
      });
    }
  }, [socket]);

  const zoomIn = () => {
    const mapRegion: Region = {
      latitude: (region as Region).latitude,
      longitude: (region as Region).longitude,
      latitudeDelta: (region as Region).latitudeDelta / 2,
      longitudeDelta: (region as Region).longitudeDelta / 2,
    };

    setRegion(mapRegion);
  };

  const zoomOut = () => {
    const mapRegion: Region = {
      latitude: (region as Region).latitude,
      longitude: (region as Region).longitude,
      latitudeDelta: (region as Region).latitudeDelta * 2,
      longitudeDelta: (region as Region).longitudeDelta * 2,
    };
    setRegion(mapRegion);
  };

  const DescriptionCard = ({
    title,
    description,
  }: {
    title: string;
    description: any;
  }) => {
    return (
      <Card cardStyle={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', marginRight: 10 }}>{title}</Text>
          <Text style={{ flex: 1 }}>{description}</Text>
        </View>
      </Card>
    );
  };

  const JobModal = () => (
    <Modal
      onClose={() => setIsJobModal(false)}
      isOpen={isJobModal}
      avoidKeyboard
    >
      <View style={styles.modal}>
        <View style={styles.modalBackground}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 15,
            }}
          >
            <View>
              <Text style={styles.title}>{jobInformation.taskName}</Text>
            </View>
            <View>
              <DescriptionCard
                title="Khách hàng:"
                description={jobInformation.customerName}
              />
              <DescriptionCard
                title="Điện thoại:"
                description={jobInformation.customerPhone}
              />
              <DescriptionCard
                title="Tại:"
                description={jobInformation.address.detail}
              />
              <DescriptionCard
                title="Dụng cụ:"
                description={jobInformation.equipment}
              />
              <DescriptionCard
                title="Thanh toán:"
                description={jobInformation.paymentMethod}
              />
              <DescriptionCard
                title="Tổng tiền:"
                description={jobInformation.totalPrice}
              />
              <DescriptionCard
                title="Phí ngoài giờ:"
                description={jobInformation.overtimePrice}
              />
            </View>
            <SwipeButton
              disabled={false}
              swipeSuccessThreshold={70}
              height={70}
              width={313}
              title="Trượt để nhận việc"
              onSwipeSuccess={() => {
                navigation.navigate(JOB_TAB.CONFIRMED, jobInformation);
                setIsJobModal(false);
              }}
              titleStyles={{ color: 'black' }}
              railFillBackgroundColor={PURPLE_COLOR}
              railFillBorderColor={WHITE_COLOR}
              containerStyles={{
                borderRadius: 15,
                marginBottom: -1,
                marginLeft: -1,
              }}
              railStyles={{ borderRadius: 15, opacity: 2 }}
              thumbIconStyles={{ borderRadius: 15 }}
              thumbIconBackgroundColor={PURPLE_COLOR}
              thumbIconBorderColor={WHITE_COLOR}
              railBackgroundColor={WHITE_COLOR}
              railBorderColor={PURPLE_COLOR}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Center style={[styles.detail, styles.top]}>
        <Text style={styles.address}>
          <Text style={styles.addressText}>{loginValue.address?.detail}</Text>
        </Text>
      </Center>
      <MapCustom region={region} />
      <JobModal />
    </SafeAreaView>
  );
};

export default NewJobTab;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    title: {
      fontSize: 26,
      textTransform: 'uppercase',
      color: colors.violet[400],
      fontWeight: '500',
    },
    container: {
      flex: 1,
      position: 'relative',
    },
    descriptionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalBackground: {
      width: (width / 100) * 80,
      height: (height / 100) * 82,
      maxHeight: (height / 100) * 82,
      backgroundColor: WHITE_COLOR,
      borderRadius: 15,
    },
    top: {
      top: -15,
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
      marginTop: sizes['1.5'] * 2,
      paddingVertical: sizes.padding,
      borderRadius: sizes.radius,
      overflow: 'hidden',
    },
    addressText: {
      fontSize: fontSizes.sm,
      lineHeight: fontSizes.sm * 1.5,
    },
  });

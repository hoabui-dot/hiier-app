import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { PURPLE_COLOR, ROUTES, WHITE_COLOR } from '../../constants/ui';
import { IDetailHiierInformation } from '../../types/ui';
import { DEFAULT_HIIER_INFORMATION } from '../../utils/defaultValue/common';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TaskApi } from '../../services/api/task';

const { width } = Dimensions.get('screen');

export interface CustomDrawerProps extends DrawerContentComponentProps {
  navigation: any;
  route: any;
}

const CustomDrawer = ( {navigation, route, ...props}: CustomDrawerProps ) => {
  const [detailInformation, setDetailInformation] =
  useState<IDetailHiierInformation>(DEFAULT_HIIER_INFORMATION);

  useEffect(() => {
    async function getHiierDetailInformation () {
      await TaskApi.getEmployeeInfo().then(response => {
        if(!response?.data?.resource) {
          return;
        }

        setDetailInformation(response?.data?.resource);
      })

    }
    getHiierDetailInformation();
  }, [])

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          width: width / 2 + 85,
          backgroundColor: PURPLE_COLOR,
          height: 140,
        }}
      >
        <View style={{ margin: 5 }}>
          <Text style={styles.text}>{detailInformation.name}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.DETAIL_INFORMATION, {
                hiierInformation: detailInformation,
              });
            }}
          >
            <Text style={[styles.text, { color: 'red', fontWeight: '400' }]}>
              Xem thông tin
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', right: 5, top: 5 }}>
          <Text style={styles.text}>{detailInformation.isPremium ? "Premium Hiier" : "Hiier"}</Text>
          <Text style={styles.text}>{`Tổng tiền: ${detailInformation.virtualMoney}`}</Text>
          <AirbnbRating
            count={5}
            isDisabled
            showRating={false}
            defaultRating={detailInformation.avgRating}
            size={14}
          />
        </View>
        <Image
          style={styles.userImage}
          source={{
            uri: detailInformation.avatar ? detailInformation.avatar : 'https://assets.capitalfm.com/2017/43/taylor-swift-1508765921.jpg',
          }}
        />
      </View>
      <View style={styles.itemList}>
        <DrawerItemList navigation={navigation} {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userImage: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 110,
    bottom: -110 / 2,
  },
  itemList: {
    marginTop: 110 / 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
});

export default CustomDrawer;

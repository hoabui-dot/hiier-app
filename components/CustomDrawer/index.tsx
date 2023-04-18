import React from 'react';
import {
  ImageBackground,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

const { width } = Dimensions.get('screen');

const CustomDrawer = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground
        style={{ height: 140 }}
        source={{
          uri: 'https://wallpapercave.com/dwp2x/MuIV2JN.jpg',
        }}
      >
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://assets.capitalfm.com/2017/43/taylor-swift-1508765921.jpg',
          }}
        />
      </ImageBackground>
      <View style={styles.itemList}>
        <DrawerItemList {...props} />
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
});

export default CustomDrawer;

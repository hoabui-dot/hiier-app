import React, { useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import { ITheme, useTheme, Icon } from 'native-base';
import Icons from '../../../utils/Icon/Icons';
import { RED_COLOR } from '../../../constants/ui';
import Constants from 'expo-constants';

export interface DetailInformationProps {
  navigation: any;
  route: any;
}

const { width } = Dimensions.get('screen');

const DetailInformation = ({ navigation, route }: DetailInformationProps) => {
  console.log('🚀 ~ file: index.tsx:22 ~ DetailInformation ~ route:', route);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="THÔNG TIN CỦA TÔI" backButton />
      <Card cardStyle={{ margin: 10 }}>
        <View style={styles.mainInformation}>
          <View style={styles.wrapImage}>
          {route.params?.avatar ? (
            <Image
              style={styles.userImage}
              source={{ uri: route.params?.avatar }}
            />
          ) : (
            <Icon as={Icons.ImageProfile} size={40} />
          )}
          </View>
          <Text>{route.params?.name}</Text>
          <Text>{route.params?.phone}</Text>
        </View>
      </Card>
      <Card cardStyle={{ marginHorizontal: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.restart}>Đăng xuất</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
};

export default DetailInformation;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      marginTop: - Constants.statusBarHeight
    },
    mainInformation: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    restart: {
      color: RED_COLOR,
    },
    userImage: {
      width: 110,
      height: 110,
      borderRadius: 110 / 2,
    },
    wrapImage: {
      marginBottom: 10
    }
  });

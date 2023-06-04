import React, { useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import { Image } from 'expo-image';
import Card from '../../../components/Card';
import { ITheme, useTheme, Icon } from 'native-base';
import Icons from '../../../utils/Icon/Icons';
import { RED_COLOR, ROUTES } from '../../../constants/ui';

export interface DetailInformationProps {
  navigation: any;
  route: any;
}

const DetailInformation = ({ navigation, route }: DetailInformationProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerText="THÔNG TIN CỦA TÔI"
        leftPress={() => navigation.goBack()}
        backButton
      />
      <Card cardStyle={{ margin: 10 }}>
        <View style={styles.mainInformation}>
          <Icon as={Icons.ImageProfile} size={40} />
          
          <Text>{route.params.name}</Text>
          <Text>{route.params.phone}</Text>
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
    },
    mainInformation: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    restart: {
      color: RED_COLOR,
    },
  });

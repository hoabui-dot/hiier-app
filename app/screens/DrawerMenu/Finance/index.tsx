import React, { useMemo, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FINANCE_TAB } from '../../../../constants/ui';
import HiPay from './HiPay';
import Trading from './Trading';
import ButtonBase from '../../../../components/Base/ButtonBase';
import {
  Image,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { ITheme, useTheme } from 'native-base';

const { width, height } = Dimensions.get('screen');

const Finance = ({ route, navigation }: any) => {
  const Tab = createMaterialTopTabNavigator();
  const [tabValue, setTabValue] = useState<string>(FINANCE_TAB.HI_BAY);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <Tab.Navigator
      tabBar={() => (
        <View>
          <Image
            resizeMode="stretch"
            style={{ height: height / 4, width: width }}
            source={require('../../../../assets/transfer.jpeg')}
          />
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(FINANCE_TAB.HI_BAY);
                setTabValue(FINANCE_TAB.HI_BAY);
              }}
              style={
                tabValue === FINANCE_TAB.HI_BAY
                ? [styles.buttonTab, styles.focusBottom]
                  : styles.buttonTab
              }
            >
              <Text style={styles.textButton}>{FINANCE_TAB.HI_BAY}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(FINANCE_TAB.TRADING);
                setTabValue(FINANCE_TAB.TRADING);
              }}
              style={
                tabValue === FINANCE_TAB.TRADING
                ? [styles.buttonTab, styles.focusBottom]
                  : styles.buttonTab
              }
            >
              <Text style={styles.textButton}>{FINANCE_TAB.TRADING}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    >
      <Tab.Screen name={FINANCE_TAB.HI_BAY} component={HiPay} />
      <Tab.Screen name={FINANCE_TAB.TRADING} component={Trading} />
    </Tab.Navigator>
  );
};

export default Finance;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    buttonTab: {
      width: '50%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'transparent',
      borderWidth: 1,
      borderBottomColor: '#ccc',
    },
    textButton: {
      fontSize: 16,
    },
    focusBottom: {
      borderBottomColor: 'blue',
    },
  });

import React, { createContext, useMemo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../../../components/CustomDrawer';
import { DRAWER } from '../../../constants/ui';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Job from '../hiier';
import SwitchButtonWithStatusText from '../../../components/SwitchButtonWithStatusText';
import Finance from './Finance';
import Supporting from './Supporting';
import FriendCode from './FriendCode';
import Notification from './Notification';
import TrainingHiier from './Training';
import Payment from '../Payment';
import JobHistory from './ActivityHistory';
import { StyleSheet, Image, View } from 'react-native';
import { Address } from '../../../types/ui';
import Tools from './Tools';
import { ITheme, useTheme } from 'native-base';
import { DEFAULT_LOGIN_NAVIGATION_VALUE } from '../../../utils/defaultValue/navigation';

export const secretHashContext = createContext<{
  secretHash: string;
  token: string;
  address: Address;
}>(DEFAULT_LOGIN_NAVIGATION_VALUE);

const DrawerMenu = ({ route }: any) => {
  const theme = useTheme();
  const Drawer = createDrawerNavigator();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <secretHashContext.Provider value={route.params}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer route={route} {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#122620',
          },
          headerTitleStyle: {
            color: '#D6AD60',
          },
          headerRight: () => <SwitchButtonWithStatusText />,
        }}
      >
        <Drawer.Screen
          name={DRAWER.JOB}
          component={Job}
          options={{
            headerTitle: () => <></>,
            drawerIcon: (args) => (
              <MaterialIcons name="house" size={24} color={args.color} />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.NOTIFICATION}
          component={Notification}
          options={{
            drawerIcon: (args) => (
              <MaterialIcons
                name="notifications-active"
                size={24}
                color={args.color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.TRAINING}
          component={TrainingHiier}
          options={{
            drawerIcon: (args) => (
              <MaterialIcons
                name="library-books"
                size={24}
                color={args.color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.JOB_HISTORY}
          component={JobHistory}
          options={{
            drawerIcon: (args) => (
              <MaterialIcons name="history" size={24} color={args.color} />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.FINANCE}
          component={Payment}
          options={{
            headerShown: false,
            drawerIcon: (args) => (
              // <MaterialCommunityIcons
              //   name="finance"
              //   size={24}
              //   color={args.color}
              // />
              <View>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../../../assets/finance-icon.png')}
                />
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.FRIEND_CODE}
          component={FriendCode}
          options={{
            drawerIcon: (args) => (
              <MaterialIcons name="qr-code" size={24} color={args.color} />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.TOOLS}
          component={Tools}
          options={{
            drawerIcon: (args) => (
              <MaterialIcons
                name="cleaning-services"
                size={24}
                color={args.color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.SUPPORTING}
          component={Supporting}
          options={{
            drawerIcon: (args) => (
              <MaterialIcons
                name="support-agent"
                size={24}
                color={args.color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </secretHashContext.Provider>
  );
};

export default DrawerMenu;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    backgroundViolet: {
      backgroundColor: args.colors.violet['400'],
      height: 80,
    },
  });

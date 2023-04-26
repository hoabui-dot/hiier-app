import React, { createContext, useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import CustomDrawer from '../../../components/CustomDrawer';
import { DRAWER, USER_STATUS } from '../../../constants/ui';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Hiier from '../hiier';
import Finance from './Finance';
import Supporting from './Supporting';
import FriendCode from './FriendCode';
import Notification from './Notification';
import ActivityHistory from './ActivityHistory';
import { TouchableOpacity } from 'react-native';
import {
  DEFAULT_HIIER_INFORMATION,
  DEFAULT_LOCATION,
} from '../../../utils/defaultValue';
import { TaskApi } from '../../../services/api/task';
import { Text } from 'react-native';

export const secretHashContext = createContext<{
  secretHash: string;
  token: string;
}>({ secretHash: '', token: '' });

const DrawerMenu = ({ route }: any) => {
  const Drawer = createDrawerNavigator();
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <secretHashContext.Provider value={route.params}>
      <Drawer.Navigator
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawer {...props} />
        )}
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                TaskApi.setActive(DEFAULT_LOCATION)
                  .then((res) => setIsActive(res.status === 200))
                  .catch((err) => console.log('err', err));
              }}
              style={{ marginRight: 20 }}
            >
              <Text style={{ fontSize: 16, color: isActive ? 'green' : 'red' }}>
                {isActive ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE}
              </Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen
          name={DRAWER.HIIER}
          component={Hiier}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <MaterialIcons name="house" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.NOTIFICATION}
          component={Notification}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <MaterialIcons
                name="notifications-active"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.TRAINING}
          component={Notification}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <MaterialIcons name="library-books" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.ACTIVITY_HISTORY}
          component={ActivityHistory}
          options={{
            drawerIcon: ({ focused, color }) => (
              <MaterialIcons name="history" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.FINANCE}
          component={Finance}
          options={{
            drawerIcon: ({ focused, color }) => (
              <MaterialCommunityIcons name="finance" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.FRIEND_CODE}
          component={FriendCode}
          options={{
            drawerIcon: ({ focused, color }) => (
              <MaterialIcons name="qr-code" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={DRAWER.SUPPORTING}
          component={Supporting}
          options={{
            drawerIcon: ({ focused, color }) => (
              <MaterialIcons name="support-agent" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </secretHashContext.Provider>
  );
};

export default DrawerMenu;

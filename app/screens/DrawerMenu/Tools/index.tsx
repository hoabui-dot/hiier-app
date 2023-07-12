import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { TOOLS } from '../../../../constants/ui';
import Tool from './tools';
import Chemical from './chemical';

const Tools = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={TOOLS.TOOL} component={Tool} />
      <Tab.Screen name={TOOLS.CHEMICAL} component={Chemical} />
    </Tab.Navigator>
  );
};

export default Tools;

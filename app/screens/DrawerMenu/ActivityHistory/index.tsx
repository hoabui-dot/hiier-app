import React from 'react';
import { JOB_HISTORY_TAB } from '../../../../constants/ui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DoneTaskHistory from './DoneTaskHistory';
import CancelTaskHistory from './CancelTaskHistory';
import { View } from 'react-native';
import Header from '../../../../components/Header';

const JobHistory = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={JOB_HISTORY_TAB.DONE} component={DoneTaskHistory} />
      <Tab.Screen name={JOB_HISTORY_TAB.CANCELED} component={CancelTaskHistory} />
    </Tab.Navigator>
  );
};

export default JobHistory;

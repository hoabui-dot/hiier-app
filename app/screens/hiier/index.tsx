import { JOB_TAB } from '../../../constants/ui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import NewJobTab from './NewJobTab';
import ConfirmedTab from './ConfirmedTab';
import WaitingJobTab from './WaitingJobTab';

const Home = () => {
  
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={JOB_TAB.NEW} component={NewJobTab} />
      <Tab.Screen name={JOB_TAB.WAITING} component={WaitingJobTab} />
      <Tab.Screen name={JOB_TAB.CONFIRMED} component={ConfirmedTab} />
    </Tab.Navigator>
  );
};

export default Home;

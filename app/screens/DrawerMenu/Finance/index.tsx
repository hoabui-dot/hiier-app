import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FINANCE_TAB } from "../../../../constants/ui";
import HiPay from "./HiPay";
import Trading from "./Trading";

const Finance = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={FINANCE_TAB.HI_BAY} component={HiPay}/>
      <Tab.Screen name={FINANCE_TAB.TRADING} component={Trading}/>
    </Tab.Navigator>
  )
}

export default Finance;
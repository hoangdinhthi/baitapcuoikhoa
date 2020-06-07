import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Order from '../features/Order';
import Profile from '../features/Profile';
import Home from '../features/Home';
import Homes from '../features/Home/main';
import Orders from '../features/Cart';
import Icon from '../components/base/Icon';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={Homes}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="MaterialCommunityIcons"
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Orders}
        options={{
          tabBarLabel: 'Order',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="MaterialCommunityIcons"
              name="cart"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Address"
        component={Order}
        options={{
          tabBarLabel: 'Address',
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="MaterialCommunityIcons"
              name="bell"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="MaterialCommunityIcons"
              name="account"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Order from '../features/Order';
import Profile from '../features/Profile';
import Home from '../features/Home';
import Homes from '../features/Home/main';
import Orders from '../features/Cart';
import Icon from '../components/base/Icon';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const OrderScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order"
        component={Orders}
        options={{
          headerTitle: 'Danh sách đơn hàng',
        }}
      />
    </Stack.Navigator>
  );
};

const MapScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={Order}
        options={{
          headerTitle: 'Vị trí cửa hàng',
        }}
      />
    </Stack.Navigator>
  );
};

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
        component={OrderScreen}
        options={{
          tabBarLabel: 'Đơn hàng',
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
        component={MapScreen}
        options={{
          tabBarLabel: 'Cửa hàng',
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="MaterialCommunityIcons"
              name="map"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tôi"
        component={Profile}
        options={{
          tabBarLabel: 'Tôi',
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

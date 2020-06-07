/**
 * các màn hình còn lại sẽ thuộc vào stack này
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../features/Home';
import routes from './Routes';
import BottomTab from './BottomTab';
import BranchStore from '../features/Home/BranchStore';
import Store from '../features/Home/index';
import ShoppingCartIcon from '../features/Home/ShoppingCartIcon';
import CartView from '../features/Home/CartView';
import Checkout from '../features/Home/Checkout';
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen
        name="ACB"
        component={BranchStore}
        options={{
          headerShown: true,
          headerTitle: 'List Store',
        }}
      />
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          headerShown: true,
          headerTitle: 'Detail Store',
          headerRight: () => <ShoppingCartIcon />,
        }}
      />
      <Stack.Screen
        name="ViewCart"
        component={CartView}
        options={{ headerShown: true, headerTitle: 'Giỏ hàng' }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: true, headerTitle: 'Thanh toán' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

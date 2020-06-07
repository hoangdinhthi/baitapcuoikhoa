import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Proptypes from 'prop-types';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import SplashSceen from '../features/splash';
import { navigationRef } from './helper';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen component={SplashSceen} name={'Splash'} />
        <Stack.Screen component={AuthStack} name={'AuthStack'} />
        <Stack.Screen component={MainStack} name={'MainStack'} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

Navigator.propTypes = {
  isLogin: Proptypes.bool,
};

export default Navigator;

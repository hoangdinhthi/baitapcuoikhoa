/**
 * config các màn hình liên quand dến authen
 * do app là bắt buộc đăng nhập nên cả stack sẽ thuộc switch
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';
import routes from './Routes';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={routes.auth.signIn}
        component={SignIn}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name={routes.auth.signUp}
        component={SignUp}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

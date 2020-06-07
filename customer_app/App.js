/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './src/redux/store'
import store from './src/reduxapp/store';
import Navigator from './src/navigation';
import Process from './src/components/fetching/Fetching/';
import FlashMessage from 'react-native-flash-message';

const theme = {
  ...DefaultTheme,
  // colors,
};

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
      <Process />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;

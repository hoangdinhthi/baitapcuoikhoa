/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './src/redux/store'
import store from './src/reduxapp/store';
import Navigator from './src/navigation';
import Process from './src/components/fetching/Fetching/';
import FlashMessage from 'react-native-flash-message';
import OneSignal from 'react-native-onesignal';
import { sharedTypes } from './src/reduxapp/reducer/sharedReducer';

const theme = {
  ...DefaultTheme,
  // colors,
};

const App = () => {
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('65553bc1-f01d-4e9d-ad8d-778310d17bf1', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  const onReceived = notification => {
    const {
      payload: { additionalData },
    } = notification;
    console.log(additionalData);

    if (additionalData?.type === 'change_cart_status') {
      store.dispatch({
        type: sharedTypes.GET_ORDERS,
        payload: additionalData.cart_id,
      });
    }

    console.log('Notification data: ', additionalData);
  };

  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = device => {
    console.log('Device info: ', device);
  };
  return (
    <Provider store={store}>
      <Navigator />
      <Process />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;

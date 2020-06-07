import { createSwitchNavigator } from 'react-navigation';
import Loading from '../features/Loading';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

/**
 * config switch
 * màn hình loading: dùng để lấy dữ liệu trc khi vào app
 * stack auth: xử lý auth (sign, signup, forward password)
 * main stack
 */
const Switch = createSwitchNavigator({
  Loading: {
    screen: Loading,
  },
  AuthStack: {
    screen: AuthStack,
  },
  MainStack: {
    screen: MainStack,
  },
});

export default Switch;

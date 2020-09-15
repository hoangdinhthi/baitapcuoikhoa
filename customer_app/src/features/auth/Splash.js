// import React, { Component } from 'react';
// import { View, StyleSheet, TextInput } from 'react-native';
// import Proptypes from 'prop-types';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { TextBase, Button, TouchWithout } from '../../components';
// import { scales, colors } from '../../config';
// import routes from '../../navigation/Routes';
// import { authActions } from '../../reduxapp/reducer/authReducer';
// import { connect } from 'react-redux';
// import { bindActionCreators, compose } from 'redux';

// class SignIn extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }

//   onPressCreateNew = () => {
//     const { navigation } = this.props;
//     navigation.replace(routes.auth.signUp);
//   };

//   _onSubmit = () => {
//     const { email, password } = this.state;
//     if (!email) {
//       return;
//     }
//     if (!password) {
//       return;
//     }

//     this.props.requestLogin({
//       email,
//       password,
//     });
//   };

//   render() {
//     // useContext
//     const { email, password } = this.state;
//     return (
//       <SafeAreaView style={styles.container}>
//         <TextBase style={styles.title}>Đăng nhập</TextBase>

//         <View style={styles.viewInput}>
//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={email => this.setState({ email })}
//           />
//         </View>

//         <View style={styles.viewInput}>
//           <TextInput
//             placeholder="Mật khẩu"
//             secureTextEntry={true}
//             value={password}
//             onChangeText={password => this.setState({ password })}
//           />
//         </View>

//         <View style={styles.viewForgot}>
//           <TextBase>Quên mật khẩu?</TextBase>
//         </View>

//         <Button
//           title={'Đăng nhập'.toUpperCase()}
//           style={styles.btnSignIn}
//           onPress={this._onSubmit}
//         />

//         <View style={styles.viewOr}>
//           <View style={styles.divider} />
//           <TextBase>{'Hoặc'.toUpperCase()}</TextBase>
//           <View style={styles.divider} />
//         </View>

//         <Button title={'facebook'.toUpperCase()} style={styles.btnSignIn} />
//         <View style={styles.viewFooter}>
//           <TouchWithout onPress={this.onPressCreateNew}>
//             <TextBase style={styles.txtCreatenew}>
//               {'Tạo tài khoản mới'.toUpperCase()}
//             </TextBase>
//           </TouchWithout>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// SignIn.propTypes = {
//   navigation: Proptypes.any,
// };

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       requestLogin: authActions.requestLogin,
//     },
//     dispatch,
//   );

// export default connect(null, mapDispatchToProps)(SignIn);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginHorizontal: scales.horizontalScale(24),
//   },
//   title: {
//     marginTop: scales.verticalScale(24 * 3),
//     fontSize: scales.moderateScale(24),
//     color: colors.primary,
//     fontWeight: '600',
//   },
//   viewInput: {
//     marginTop: scales.verticalScale(24),
//     paddingHorizontal: scales.horizontalScale(12),
//     borderRadius: 20,
//     width: '100%',
//     borderWidth: 1,
//     borderColor: colors.primary,
//     paddingVertical: scales.verticalScale(12),
//   },
//   viewForgot: {
//     marginTop: scales.verticalScale(24),
//   },
//   viewFooter: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   txtCreatenew: {
//     color: colors.primary,
//     fontSize: scales.moderateScale(20),
//     textTransform: 'uppercase',
//   },
//   btnSignIn: {
//     borderRadius: 20,
//     marginTop: scales.verticalScale(24),
//   },
//   viewOr: {
//     marginTop: scales.verticalScale(24),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   divider: {
//     height: StyleSheet.hairlineWidth,
//     width: '40%',
//     backgroundColor: 'red',
//   },
// });

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import routes from '../../navigation/Routes';
// import { useTheme } from 'react-native-paper';

// import { AuthContext } from '../components/context';

const SignIn = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Image
          animation="bounceIn"
          duraton="1500"
          source={require('../../Images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Ứng dụng đặt và giao hàng
        </Text>
        <Text style={styles.text}>Đăng nhập tài khoản khác</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.auth.signIn)}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Bắt đầu nào!</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

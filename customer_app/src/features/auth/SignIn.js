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
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import Proptypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import routes from '../../navigation/Routes';
import { useTheme } from 'react-native-paper';
import { authActions } from '../../reduxapp/reducer/authReducer';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { showMessage } from 'react-native-flash-message';

const SignIn = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const dispatch = useDispatch();
  const requestLogin = (email, password) =>
    dispatch(authActions.requestLogin({ email: email, password: password }));
  const _onSubmit = () => {
    if (!data.email) {
      showMessage({
        message: 'email không được để trống',
        type: 'danger',
      });
      return;
    }
    if (!data.password) {
      showMessage({
        message: 'mật khẩu không được để trống',
        type: 'danger',
      });
      return;
    }
    requestLogin(data.email, data.password);
  };
  const handleUsernameChange = val => {
    setData({
      ...data,
      email: val,
    });
  };
  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

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
        {/* <Text style={styles.text_header}>Đăng nhập!</Text> */}
      </View>
      <View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          Tên đăng nhập
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email của bạn"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handleUsernameChange(val)}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          Mật Khẩu
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Mật khẩu của bạn"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={{ color: '#009387', marginTop: 15 }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={_onSubmit}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Đăng Nhập
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(routes.auth.signUp)}
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
                },
              ]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

SignIn.propTypes = {};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestLogin: authActions.requestLogin,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SignIn);
const { height } = Dimensions.get('screen');
const height_logo = height * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    // justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    marginTop: 5,
    width: height_logo,
    height: height_logo,
  },
});

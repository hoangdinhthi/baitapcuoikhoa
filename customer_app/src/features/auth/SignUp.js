// import React, { Component } from 'react';
// import { View, StyleSheet, TextInput } from 'react-native';
// import Proptypes from 'prop-types';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { TextBase, Button, TouchWithout } from '../../components';
// import { scales, colors } from '../../config';
// import routes from '../../navigation/Routes';

// class SignUp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   onPressCreateNew = () => {
//     const { navigation } = this.props;
//     navigation.replace(routes.auth.signIn);
//   };

//   render() {
//     // useContext
//     return (
//       <SafeAreaView style={styles.container}>
//         <TextBase style={styles.title}>Đăng ký</TextBase>

//         <View style={styles.viewInput}>
//           <TextInput placeholder="Họ tên" />
//         </View>

//         <View style={styles.viewInput}>
//           <TextInput placeholder="Số điện thoại" />
//         </View>

//         <View style={styles.viewInput}>
//           <TextInput placeholder="Mật khẩu" />
//         </View>

//         <View style={styles.viewInput}>
//           <TextInput placeholder="Nhập lại mật khẩu" />
//         </View>

//         <Button title={'Đăng ký'.toUpperCase()} style={styles.btnSignUp} />

//         <View style={styles.viewOr}>
//           <View style={styles.divider} />
//           <TextBase>OR</TextBase>
//           <View style={styles.divider} />
//         </View>

//         <Button title={'facebook'.toUpperCase()} style={styles.btnSignUp} />
//         <View style={styles.viewFooter}>
//           <TouchWithout onPress={this.onPressCreateNew}>
//             <TextBase style={styles.txtCreatenew}>Đã có tài khoản</TextBase>
//           </TouchWithout>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// SignUp.propTypes = {
//   navigation: Proptypes.any,
// };

// export default SignUp;

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
//   btnSignUp: {
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
//     width: '45%',
//     backgroundColor: 'red',
//   },
// });
import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import routes from '../../navigation/Routes';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { authActions } from '../../reduxapp/reducer/authReducer';
import { showMessage } from 'react-native-flash-message';
const SignUp = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    confirm_password: '',
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const dispatch = useDispatch();
  const requestSignup = (email, password) =>
    dispatch(authActions.requestSignup({ email: email, password: password }));
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
    if (!data.confirm_password) {
      showMessage({
        message: 'nhập lại mật khẩu không được để trống',
        type: 'danger',
      });
      return;
    }
    if (data.password !== data.confirm_password) {
      showMessage({
        message: 'mật khẩu nhập lại không khớp',
        type: 'danger',
      });
      return;
    }
    requestSignup(data.email, data.password);
  };
  const handleEmailChange = val => {
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

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Đăng ký ngay!</Text>
      </View>
      <View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Tên đăng nhập</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Email của bạn"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleEmailChange(val)}
            />
            {data.check_textInputChange ? (
              <View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Mật khẩu
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Mật khẩu của bạn"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
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

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Xác nhận lại mật khẩu
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Mật khẩu xác nhận của bạn"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>Bạn đã đồng ý với các</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
              {' '}
              Điều khoản của dịch vụ
            </Text>
            <Text style={styles.color_textPrivate}> và</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
              {' '}
              chính sách của chúng tôi
            </Text>
          </View>
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
                  Đăng Ký
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                Đăng Nhập
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestSignup: authActions.requestSignup,
    },
    dispatch,
  );
export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});

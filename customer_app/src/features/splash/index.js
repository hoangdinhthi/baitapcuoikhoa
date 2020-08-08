import React, { Component } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppStorage from '../../config/network/storage';
import { authActions } from '../../reduxapp/reducer/authReducer';

class SlashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const userDataString = await AppStorage.getToken();
    if (userDataString) {
      const userDataJson = JSON.parse(userDataString);
      this.props.loginSuccess(userDataJson.user);
      this.props.navigation.navigate('MainStack');
    } else {
      this.props.navigation.navigate('AuthStack');
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#009387',
        }}>
        <Image
          animation="bounceIn"
          duraton="1500"
          source={require('../../Images/logo.png')}
          style={{
            width: 150,
            height: 150,
            marginBottom: 20,
          }}
          resizeMode="stretch"
        />
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

SlashScreen.propTypes = {};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginSuccess: authActions.loginSuccess,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SlashScreen);

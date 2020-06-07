import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Proptypes from 'prop-types';
import AppStorage from '../../config/network/storage';
import { authActions } from '../../reduxapp/reducer/authReducer';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

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
        }}>
        <ActivityIndicator />
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

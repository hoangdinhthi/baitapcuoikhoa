import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Proptypes from 'prop-types';
import { SwitchActions } from 'react-navigation';
import routes from '../../navigation/Routes';
import { colors } from '../../config';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('object');
    // const { navigation } = this.props
    // navigation.dispatch(SwitchActions.jumpTo({ routeName: routes.auth.main }))
  }

  render() {
    return <View style={{ backgroundColor: colors.primary }} />;
  }
}

Loading.propTypes = {
  // navigation: Proptypes.any,
};

export default Loading;

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Proptypes from 'prop-types';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Address </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Index.propTypes = {};

export default Index;

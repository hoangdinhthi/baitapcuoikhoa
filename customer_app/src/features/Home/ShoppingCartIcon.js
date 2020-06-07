import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Icon from '../../components/base/Icon';
import { useNavigation } from '@react-navigation/core';
import routes from '../../navigation/Routes';

const ShoppingCartIcon = ({ cartItems }) => {
  const navigation = useNavigation();

  _onpress = () => {
    navigation.navigate('ViewCart');
  };

  return (
    <TouchableOpacity onPress={_onpress}>
      <View style={styles.container}>
        <View style={styles.quantity}>
          <Text style={styles.txt}>{cartItems.length}</Text>
        </View>
        <Icon type="Ionicons" name="md-cart" size={30} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  quantity: {
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(95,197,123,0.8)',
    right: 15,
    bottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
  };
};

export default connect(mapStateToProps)(ShoppingCartIcon);

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import { TextBase, Button, TouchWithout } from '../../components';
import { scales, colors } from '../../config';
import CartList from '../../components/Home/CartList';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { sharedActions } from '../../reduxapp/reducer/sharedReducer';
import { useNavigation } from '@react-navigation/core';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '',
      address: '',
    };
  }
  _onpress = () => {
    this.props.navigation.navigate('Store');
  };

  render() {
    var { cartItems, checkout } = this.props;
    const { phone_number, address } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TextBase style={styles.title}>Thông tin Cần Nhập</TextBase>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Số điện thoại"
            value={phone_number}
            onChangeText={phone_number => this.setState({ phone_number })}
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Địa chỉ"
            value={address}
            onChangeText={address => this.setState({ address })}
          />
        </View>
        <View style={styles.viewOr}>
          <View style={styles.divider} />
          <TextBase>{'Món ăn'.toUpperCase()}</TextBase>
          <View style={styles.divider} />
        </View>
        <FlatList
          data={cartItems}
          renderItem={({ item, index }) => {
            return <CartList item={item} index={index} />;
          }}
          keyExtractor={item => `${item.id}`}
        />
        <View style={{ flex: 1, flexDirection: 'column', marginTop: 15 }}>
          <View
            style={{
              borderColor: 'red',
              borderWidth: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.flatListItems1}>Tổng tiền: </Text>
            <Text style={styles.flatListItems1}>
              {cartItems.reduce(
                (acc, el) => (acc += el.quantity * el.price),
                0,
              )}
            </Text>
          </View>
        </View>
        <Button
          title={'Thanh toán'.toUpperCase()}
          style={styles.btnsubmit}
          onPress={() => {
            checkout({
              phone_number,
              address,
              orders: cartItems.map(el => ({
                food: el._id,
                quantity: el.quantity,
              })),
            });
            cartItems = {};
            this._onpress();
          }}
        />
      </SafeAreaView>
    );
  }
}

Checkout.propTypes = {};
const mapStateToProps = state => ({
  cartItems: state.cartItems,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      checkout: sharedActions.checkout,
    },
    dispatch,
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scales.horizontalScale(24),
  },
  title: {
    marginTop: scales.verticalScale(24 * 3),
    fontSize: scales.moderateScale(24),
    color: colors.primary,
    fontWeight: '600',
  },
  viewInput: {
    marginTop: scales.verticalScale(24),
    paddingHorizontal: scales.horizontalScale(12),
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: scales.verticalScale(12),
  },
  viewForgot: {
    marginTop: scales.verticalScale(24),
  },
  viewFooter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  txtCreatenew: {
    color: colors.primary,
    fontSize: scales.moderateScale(20),
    textTransform: 'uppercase',
  },
  btnsubmit: {
    borderRadius: 20,
    marginTop: scales.verticalScale(24),
    marginBottom: scales.verticalScale(24),
  },
  viewOr: {
    marginTop: scales.verticalScale(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '40%',
    backgroundColor: 'red',
  },
  flatListItems1: {
    fontSize: 14,
    fontWeight: '700',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

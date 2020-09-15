import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { TextBase, Button, TouchWithout } from '../../components';
import { scales, colors } from '../../config';
import CartList from '../../components/Home/CartList';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { sharedActions } from '../../reduxapp/reducer/sharedReducer';
import { useNavigation } from '@react-navigation/core';
import { formatCurrency } from '../../service/orderService';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '',
      address: '',
      isForcused: false,
      mode: 1,
    };
  }
  handleFocus = event => {
    this.setState({ isForcused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  handleBlur = event => {
    this.setState({ isForcused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  _onpress = () => {
    this.props.navigation.navigate('Store');
  };

  render() {
    var { cartItems, checkout, onFocus, onBlur } = this.props;
    const { phone_number, address, isForcused } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TextBase style={styles.title}>Thông tin Cần Nhập</TextBase>

        <TextInput
          style={styles.texs}
          placeholder="Số điện thoại"
          value={phone_number}
          selectionColor={'#428AF8'}
          underlineColorAndroid={isForcused ? '#428AF8' : '#D3D3D3'}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChangeText={phone_number => this.setState({ phone_number })}
        />
        <TextInput
          style={styles.texs}
          placeholder="Địa chỉ"
          value={address}
          selectionColor={'#428AF8'}
          underlineColorAndroid={isForcused ? '#428AF8' : '#D3D3D3'}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChangeText={address => this.setState({ address })}
        />
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
              borderColor: '#D3D3D3',
              borderWidth: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'space-between',
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 4,
            }}>
            <Text style={styles.flatListItems1}>Tổng tiền: </Text>
            <Text style={styles.flatListItems1}>
              {formatCurrency(
                parseInt(
                  cartItems.reduce(
                    (acc, el) => (acc += el.quantity * el.price),
                    0,
                  ),
                ),
              )}{' '}
              Đ
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                mode: 0,
              })
            }
            style={[
              styles.item,
              this.state.mode === 0 && {
                borderColor: 'red',
              },
            ]}>
            <Icon
              name="cards"
              size={20}
              color={this.state.mode === 0 ? 'black' : '#D3D3D3'}
            />
            <Text
              style={{ color: this.state.mode === 0 ? 'black' : '#D3D3D3' }}>
              Thẻ ngân hàng
            </Text>
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity
            onPress={() =>
              this.setState({
                mode: 1,
              })
            }
            style={[
              styles.item,
              this.state.mode === 1 && {
                borderColor: 'red',
              },
            ]}>
            <Icon
              name="cash"
              size={20}
              color={this.state.mode === 1 ? 'black' : '#D3D3D3'}
            />
            <Text
              style={{
                color: this.state.mode === 1 ? 'black' : '#D3D3D3',
              }}>
              Tiền mặt
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title={'Đặt đơn'.toUpperCase()}
          style={styles.btnsubmit}
          onPress={() => {
            if (!this.state.phone_number) {
              showMessage({
                message: 'số điện thoại không được để trống',
                type: 'danger',
              });
              return;
            }
            if (!this.state.address) {
              showMessage({
                message: 'địa chỉ không được để trống',
                type: 'danger',
              });
              return;
            }
            checkout({
              phone_number,
              address,
              orders: cartItems.map(el => ({
                food: el._id,
                quantity: el.quantity,
              })),
            });
            // cartItems = {};
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
    paddingHorizontal: scales.horizontalScale(15),
    backgroundColor: 'white',
  },
  title: {
    marginTop: scales.verticalScale(24),
    fontSize: scales.moderateScale(24),
    color: colors.black,
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
    marginBottom: 10,
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
  texs: {
    height: 70,
    paddingLeft: 6,
  },
  item: {
    height: 55,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D3D3D3',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

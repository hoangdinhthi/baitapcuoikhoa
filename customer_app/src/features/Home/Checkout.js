import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import { TextBase, Button, TouchWithout } from '../../components';
import { scales, colors } from '../../config';
import Proptypes from 'prop-types';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextBase style={styles.title}>Thông tin Cần Nhập</TextBase>

        <View style={styles.viewInput}>
          <TextInput placeholder="Số điện thoại" />
        </View>

        <View style={styles.viewInput}>
          <TextInput placeholder="Địa chỉ" />
        </View>
        <View style={styles.viewOr}>
          <View style={styles.divider} />
          <TextBase>{'Món ăn'.toUpperCase()}</TextBase>
          <View style={styles.divider} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 1,
          }}>
          <Image
            source={require('../../Images/haisan.jpg')}
            style={{ width: 60, height: 60, margin: 5 }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.flatListItems1}>x name</Text>
            <Text style={styles.flatListItems1}>2000</Text>
          </View>
          <View style={{ height: 1, backgroundColor: '#a9a9a9' }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 1,
          }}>
          <Image
            source={require('../../Images/haisan.jpg')}
            style={{ width: 60, height: 60, margin: 5 }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.flatListItems1}>x name</Text>
            <Text style={styles.flatListItems1}>2000</Text>
          </View>
          <View style={{ height: 1, backgroundColor: '#a9a9a9' }} />
        </View>

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
            <Text style={styles.flatListItems1}>2000</Text>
          </View>
        </View>

        <Button title={'Thanh toán'.toUpperCase()} style={styles.btnsubmit} />
      </SafeAreaView>
    );
  }
}

Checkout.propTypes = {};

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
export default Checkout;

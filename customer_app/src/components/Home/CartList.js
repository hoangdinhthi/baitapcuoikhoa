import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Proptypes from 'prop-types';
import { formatCurrency } from '../../service/orderService';
class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
        }}>
        <Image
          source={{ uri: item.image }}
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
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
            }}>
            {`${item.quantity} x ${item.price} = ${formatCurrency(
              parseInt(item.quantity * item.price),
            )}`}{' '}
            Đ
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#a9a9a9' }} />
      </View>
    );
  }
}

CartList.propTypes = {};

export default CartList;

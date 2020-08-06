import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Proptypes from 'prop-types';
import Icon from '../base/Icon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addingToCart } from '../../reduxapp/actionCreator';
import { formatCurrency } from '../../service/orderService';
class BranchStoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickAddCarts(data) {
    this.props.addingToCart(data);
  }

  render() {
    const { item } = this.props;
    const hasInCart = this.props.cartItems.find(el => el.name === item.name);
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100, margin: 5 }}
          />
          <View
            style={{
              flex: 1,
              padding: 10,
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-evenly',
            }}>
            <Text style={styles.flatListItems1}> {item.name} </Text>
            <Text style={styles.flatListItems2}>{item.description}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>Giá: </Text>
              <Text
                style={{ fontSize: 14, fontWeight: '700', marginRight: 50 }}>
                {formatCurrency(parseInt(item.price))} Đ
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableHighlight
                onPress={() => this.onClickAddCarts(item)}
                disabled={hasInCart}
                style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: '#a9a9a9',
                    width: 80,
                    height: 20,
                    borderRadius: 5,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'red',
                    marginRight: 20,
                    paddingVertical: 3,
                    paddingHorizontal: 17,
                  }}>
                  {hasInCart ? 'Đã thêm' : 'Thêm +'}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.props.navigations.navigate('Store')}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: '#a9a9a9',
                    width: 80,
                    height: 20,
                    borderRadius: 5,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'red',
                    paddingVertical: 3,
                    paddingHorizontal: 24,
                  }}>
                  N.hàng
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: 'white' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatListItems1: {
    fontSize: 14,
    fontWeight: '700',
  },
  flatListItems2: {
    color: '#a9a9a9',
  },
});
BranchStoreList.propTypes = {};

const mapStateToProps = state => ({
  cartItems: state.cartItems,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addingToCart,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BranchStoreList);

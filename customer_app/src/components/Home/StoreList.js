import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addingToCart } from '../../reduxapp/actionCreator';
import { formatCurrency } from '../../service/orderService';

class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickAddCarts(data) {
    this.props.addingToCart(data);
  }

  render() {
    const {
      imageUri,
      nameStore,
      locationStore,
      discountStore,
      item,
    } = this.props;
    const hasInCart = this.props.cartItems.find(el => el.name === item.name);
    return (
      <View
        style={{
          width: 140,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#DDA',
          borderRadius: 10,
          paddingBottom: 10,
        }}>
        <View>
          <Image
            resizeMode="cover"
            source={{ uri: item.image }}
            style={{
              width: 140,
              height: 140,
            }}
          />
        </View>
        <View style={{ padding: 10, height: 120 }}>
          <Text style={{ fontSize: 14, fontWeight: '700' }}>{item.name}</Text>
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: 'grey',
                overflow: 'hidden',
              }}>
              {item.description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text style={{ height: 15, fontSize: 14, fontWeight: '700' }}>
              Giá: {formatCurrency(parseInt(item.price))} Đ
            </Text>
            <TouchableOpacity
              onPress={() => this.onClickAddCarts(item)}
              disabled={hasInCart}>
              <Icon
                name="plus-circle"
                size={24}
                color={hasInCart ? 'grey' : 'red'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

StoreList.propTypes = {};
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
export default connect(mapStateToProps, mapDispatchToProps)(StoreList);

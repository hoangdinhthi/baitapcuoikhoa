import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import Proptypes from 'prop-types';
import { addingToCart } from '../../reduxapp/actionCreator';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
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
          height: 170,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#dddddd',
        }}>
        <View style={{ flex: 2 }}>
          <Image
            source={{ uri: item.image }}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{item.name}</Text>
          <Text
            style={{
              height: 40,
              fontSize: 14,
              fontWeight: '400',
              color: '#00ffff',
            }}>
            {item.description}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>
            Prices: {item.price}
          </Text>
          <View>
            <TouchableHighlight
              onPress={() => this.onClickAddCarts(item)}
              disabled={hasInCart}
              style={{ backgroundColor: 'red' }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: '#a9a9a9',
                  width: 130,
                  borderRadius: 5,
                  fontSize: 10,
                  fontWeight: '400',
                  paddingHorizontal: 40,
                }}>
                {hasInCart ? 'Added Card' : 'Add Cart'}
              </Text>
            </TouchableHighlight>
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

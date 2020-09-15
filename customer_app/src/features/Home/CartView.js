import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from '../../components/base/Icon';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useNavigation } from '@react-navigation/core';
import { increQuanity, deQuantity } from '../../reduxapp/actionCreator';
import { formatCurrency } from '../../service/orderService';
const { width } = Dimensions.get('window');
const CartView = props => {
  const navigation = useNavigation();
  const _onpress = () => {
    navigation.navigate('Checkout');
  };
  const { cartItems, incre, de } = props;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView>
          {cartItems.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  width: width - 20,
                  marginTop: 10,
                  marginBottom: 5,
                  flexDirection: 'row',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: '#cccccc',
                  paddingBottom: 10,
                }}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: width / 3,
                    height: 100,
                  }}
                  source={{
                    uri: item.image,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'trangraysparent',
                    padding: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                    <Text>{item.description}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {formatCurrency(parseInt(item.price * item.quantity))} Đ
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={() => de(i)}>
                        <Icon
                          type="Ionicons"
                          name="ios-remove-circle"
                          size={35}
                          color="red"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          paddingHorizontal: 15,
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity onPress={() => incre(i)}>
                        <Icon
                          type="Ionicons"
                          name="ios-add-circle"
                          size={35}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          <View
            style={{
              height: 20,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#33c37d',
              width: 200,
              alignItems: 'center',
              padding: 12,
              margin: 20,
              borderRadius: 50,
              alignSelf: 'center',
            }}
            onPress={_onpress}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: 1.1,
              }}>
              Xác nhận
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 20,
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cartItems,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      incre: increQuanity,
      de: deQuantity,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(CartView);

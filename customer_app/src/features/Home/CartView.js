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

const { width } = Dimensions.get('window');
const CartView = props => {
  const navigation = useNavigation();
  _onpress = () => {
    navigation.navigate('Checkout');
  };
  const { cartItems, incre, de } = props;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: 20,
        }}
      />
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#33c37d',
        }}>
        Cart food
      </Text>
      <View
        style={{
          height: 10,
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView>
          {cartItems.map((item, i) => {
            return (
              <View
                style={{
                  width: width - 20,
                  margin: 10,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  borderBottomWidth: 2,
                  borderColor: '#cccccc',
                  paddingBottom: 10,
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: width / 3,
                    height: width / 3,
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
                        fontSize: 20,
                      }}>
                      {item.name}
                    </Text>
                    <Text> Lorem Ipsum de food </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#33c37d',
                        fontSize: 20,
                      }}>
                      $ {item.price * item.quantity}
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
                          color="#33c37d"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          paddingHorizontal: 8,
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
                          color="#33c37d"
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
              width: width - 40,
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
              margin: 20,
            }}
            onPress={_onpress}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              }}>
              CHECKOUT
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

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
import Proptypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../../components/base/Icon';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { increQuanity, deQuantity } from '../../reduxapp/actionCreator';

const { width } = Dimensions.get('window');
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
    };
  }

  render() {
    const { cartItems, incre, de } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <Image
            source={require('../../Images/bill.jpg')}
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
            <Text style={styles.flatListItems1}> hóa đơn 1 </Text>
            <Text style={styles.flatListItems2}>tình trạng</Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: 'white' }} />
      </View>
    );
  }
}

Cart.propTypes = {};

const styles = StyleSheet.create({
  flatListItems1: {
    fontSize: 14,
    fontWeight: '700',
  },
  flatListItems2: {
    color: '#a9a9a9',
  },
});
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
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

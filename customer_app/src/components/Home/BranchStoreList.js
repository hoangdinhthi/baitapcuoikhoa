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

class BranchStoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickAddCarts(data) {
    this.props.addingToCart(data);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <Image
            source={{ uri: this.props.item.imageUrl }}
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
            <Text style={styles.flatListItems1}> {this.props.item.name} </Text>
            <Text style={styles.flatListItems2}>
              {this.props.item.foodDescription}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Icon type="Ionicons" name="md-star" size={15} />
              <Text
                style={{ fontSize: 14, fontWeight: '700', marginRight: 50 }}>
                2000
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableHighlight
                onPress={() => this.onClickAddCarts(this.props.item)}
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
                  Add Cart
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
                  Store Detail
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

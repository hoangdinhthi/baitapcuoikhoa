import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Proptypes from 'prop-types';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from '../../components/base/Icon';
import { addingToCart } from '../../reduxapp/actionCreator';

const { height, width } = Dimensions.get('window');

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
      dataCategories: [],
      selectCatg: 0,
      dataFood: [],
      slug: '',
    };
  }

  componentDidMount() {
    const url = 'http://tutofox.com/foodapp/api.json';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataBanner: responseJson.banner,
          dataCategories: responseJson.categories,
          dataFood: responseJson.food,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { cartItems, categories } = this.props;
    const { slug } = this.state;
    const cateKeys = Object.keys(categories);
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f2f2f2',
          }}>
          <View
            style={{
              width,
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 60,
                width: width / 2,
                margin: 10,
              }}
              resizeMode="contain"
              source={{
                uri: 'https://tutofox.com/foodapp/foodapp.png',
              }}
            />
            <Swiper
              style={{
                height: width / 2,
              }}
              showsButtons={false}
              autoplay
              autoplayTimeout={2}>
              {this.state.dataBanner.map((itembann, index) => {
                return (
                  <Image
                    key={'img' + index}
                    style={styles.imageBanner}
                    resizeMode="contain"
                    source={{
                      uri: itembann,
                    }}
                  />
                );
              })}
            </Swiper>
            <View
              style={{
                height: 20,
              }}
            />
            <View
              style={{
                width,
                borderRadius: 20,
                paddingVertical: 20,
                backgroundColor: 'white',
              }}>
              <Text style={styles.titleCatg}>
                Categories {this.state.selectCatg}
              </Text>
              <FlatList
                horizontal
                data={Object.keys(categories)}
                renderItem={({ item }) => this._renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
              <FlatList
                // horizontal={true}
                data={
                  slug
                    ? categories[slug]
                    : cateKeys.length
                    ? categories[cateKeys[0]]
                    : []
                }
                numColumns={2}
                renderItem={this._renderItemFood}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={{ height: 20 }} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  _renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.divCategorie, { backgroundColor: item.color }]}
        onPress={() => this.setState({ slug: item })}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item}</Text>
      </TouchableOpacity>
    );
  }

  getName = slug => {
    switch (slug) {
      case 'm':
        return 'My Y';

      default:
        return 'Default ';
    }
  };

  _renderItemFood = ({ item }) => {
    const catg = this.state.selectCatg;
    const hasInCart = this.props.cartItems.find(el => el.image === item.image);

    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.image }}
          />
          <View
            style={{
              height: width / 2 - 20 - 90,
              backgroundColor: 'transparent',
              width: width / 2 - 20 - 10,
            }}
          />
          <Text
            style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
            {item.name}
          </Text>
          <Text>Descp Food and Details</Text>
          <Text style={{ fontSize: 20, color: 'green' }}>${item.price}</Text>
          <TouchableOpacity
            onPress={() => this.onClickAddCarts(item)}
            disabled={hasInCart}
            style={{
              width: width / 2 - 40,
              backgroundColor: '#33c37d',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              padding: 4,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
              }}>
              {hasInCart ? 'Added Card' : 'Add Cart'}
            </Text>
            <View
              style={{
                width: 10,
              }}
            />
            <Icon
              type="Ionicons"
              name="ios-add-circle"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  };

  onClickAddCarts(data) {
    this.props.addingToCart(data);
  }

  onClickAddCart(data) {
    const itemcart = {
      food: data,
      quantity: 1,
      price: data.price,
    };

    AsyncStorage.getItem('cart')
      .then(datacart => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
          alert(JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
          alert(JSON.stringify(cart));
        }

        alert('Add Cart');
      })
      .catch(err => {
        alert(err);
      });
  }
}
Index.propTypes = {};

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  divCategorie: {
    backgroundColor: 'red',
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  titleCatg: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageFood: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  divFood: {
    width: width / 2 - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  cartItems: state.cartItems,
  categories: state.share.categories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addingToCart,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Index);

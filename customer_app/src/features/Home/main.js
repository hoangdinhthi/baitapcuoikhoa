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
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Proptypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Icon from '../../components/base/Icon';
import StoreList from '../../components/Home/StoreList';
import listBranch from '../../data/ListBranchStore';
import { sharedActions } from '../../reduxapp/reducer/sharedReducer';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import ShoppingCartIcon from './ShoppingCartIcon';
import { black } from 'ansi-colors';

const { height, width } = Dimensions.get('window');
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    };
  }

  componentDidMount() {
    this.props.fetchPreview();
  }

  render() {
    const { categories } = this.props;
    return (
      <SafeAreaView style={styles.common}>
        <View style={styles.common}>
          <View
            style={{
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd',
            }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ACB', {
                  status: 1,
                })
              }>
              <View style={styles.search}>
                <Icon type="Ionicons" name="md-search" size={30} />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Tìm kiếm món ăn"
                  placeholderTextColor="grey"
                  style={styles.text}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView scrollEventThrottle={16}>
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                Chúng tôi có thể giúp bạn tìm ?
              </Text>
              <View
                style={{
                  height: 320,
                  marginTop: 20,
                }}>
                <FlatList
                  horizontal
                  data={categories?.pizza ? categories.pizza : []}
                  renderItem={({ item, index }) => {
                    return <StoreList item={item} index={index} />;
                  }}
                  keyExtractor={item => `${item.id}`}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() =>
                      this.props.navigation.navigate('ACB', {
                        status: 0,
                      })
                    }>
                    <Icon type="Ionicons" name="md-restaurant" size={15} />
                    <Text> Món ăn </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button1}
                    onPress={() => this.props.navigation.navigate('Store')}>
                    <Icon type="Ionicons" name="md-search" size={15} />
                    <Text> N.hàng </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button3}>
                    <Icon type="Ionicons" name="md-cart" size={15} />
                    <Text> Siêu thị </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 20, fontWeight: '700', marginTop: 15 }}>
                    Hình ảnh cửa hàng
                  </Text>
                  <Swiper
                    style={{
                      height: width / 2,
                    }}
                    showsButtons={false}
                    autoplay
                    autoplayTimeout={2}>
                    <View
                      style={{ width: width - 40, height: 220, marginTop: 20 }}>
                      <Image
                        style={{
                          flex: 1,
                          width: null,
                          height: null,
                          resizeMode: 'cover',
                        }}
                        source={require('../../Images/Store1.jpg')}
                      />
                    </View>
                    <View
                      style={{ width: width - 40, height: 220, marginTop: 20 }}>
                      <Image
                        style={{
                          flex: 1,
                          width: null,
                          height: null,
                          resizeMode: 'cover',
                        }}
                        source={require('../../Images/khong-gian-tang-1-maison-3.jpg')}
                      />
                    </View>
                  </Swiper>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      paddingHorizontal: 20,
                    }}>
                    Mỳ ý
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('MoreView', {
                        slugName: 'm',
                      })
                    }>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '200',
                        paddingHorizontal: 20,
                      }}>
                      Chi tiết >>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: 320,
                    marginTop: 10,
                  }}>
                  <FlatList
                    horizontal
                    data={categories?.m ? categories.m : []}
                    renderItem={({ item, index }) => {
                      return <StoreList item={item} index={index} />;
                    }}
                    keyExtractor={item => `${item.id}`}
                  />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                  <Swiper
                    style={{
                      height: width / 2,
                    }}
                    showsButtons={false}
                    autoplay
                    autoplayTimeout={2}>
                    <View
                      style={{ width: width - 40, height: 220, marginTop: 20 }}>
                      <Image
                        style={{
                          flex: 1,
                          width: null,
                          height: null,
                          resizeMode: 'cover',
                        }}
                        source={require('../../Images/banner.jpg')}
                      />
                    </View>
                    <View
                      style={{ width: width - 40, height: 220, marginTop: 20 }}>
                      <Image
                        style={{
                          flex: 1,
                          width: null,
                          height: null,
                          resizeMode: 'cover',
                        }}
                        source={require('../../Images/Store1.jpg')}
                      />
                    </View>
                  </Swiper>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      paddingHorizontal: 20,
                    }}>
                    Đồ ăn kèm
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('MoreView', {
                        slugName: 'topping',
                      })
                    }>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '200',
                        paddingHorizontal: 20,
                      }}>
                      Chi tiết >>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: 320,
                    marginTop: 20,
                  }}>
                  <FlatList
                    horizontal
                    data={categories?.topping ? categories.topping : []}
                    renderItem={({ item, index }) => {
                      return <StoreList item={item} index={index} />;
                    }}
                    keyExtractor={item => `${item.id}`}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {this.props.cartItems.length > 0 ? (
          <View style={styles.fabbutton}>
            <ShoppingCartIcon />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

Main.propTypes = {};

const mapStateToProps = state => ({
  categories: state.share.categories,
  cartItems: state.cartItems,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPreview: sharedActions.fetchPreview,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  common: {
    flex: 1,
  },
  header: {},
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 25,
    marginVertical: 20,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontWeight: '700',
    backgroundColor: '#FFFFFF',
  },
  button2: {
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#27ddc5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  button1: {
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ff7f50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button3: {
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#7fff00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  fabbutton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 20,
  },
});

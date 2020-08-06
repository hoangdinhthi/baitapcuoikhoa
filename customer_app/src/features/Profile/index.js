import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Proptypes from 'prop-types';
import Icon from '../../components/base/Icon';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { authActions } from '../../reduxapp/reducer/authReducer';
import InfoText from './InfoText';
import { Avatar, ListItem } from 'react-native-elements';
import BaseIcon from './Icon';
import Chevron from './Chevron';
import { red, bold } from 'ansi-colors';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}>
          <View style={styles.titleBar} />
          <View style={{ alignSelf: 'center' }}>
            <View style={styles.profileImage}>
              <Image
                source={require('../../Images/pikachu.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.active} />
            <View style={styles.add}>
              <Icon
                type="Ionicons"
                name="ios-add"
                size={30}
                color="#DFD8C8"
                style={{ marginTop: 6, marginLeft: 2 }}
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>
              Hoàng Đình Thi
            </Text>
            <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14 }]}>
              Developer
            </Text>
          </View>
          <InfoText text="Account" />
          <View>
            <ListItem
              // chevron
              title="Ví"
              rightTitle="USD"
              rightTitleStyle={{ fontSize: 15 }}
              onPress={() => this.onPressOptions()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <BaseIcon
                  containerStyle={{ backgroundColor: '#FAD291' }}
                  icon={{
                    type: 'font-awesome',
                    name: 'money',
                  }}
                />
              }
              rightIcon={<Chevron />}
            />
            <ListItem
              title="Vị trí"
              rightTitle="New York"
              rightTitleStyle={{ fontSize: 15 }}
              onPress={() => this.onPressOptions()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <BaseIcon
                  containerStyle={{ backgroundColor: '#57DCE7' }}
                  icon={{
                    type: 'material',
                    name: 'place',
                  }}
                />
              }
              rightIcon={<Chevron />}
            />
            <ListItem
              title="Ngôn ngữ"
              rightTitle="English"
              rightTitleStyle={{ fontSize: 15 }}
              onPress={() => this.onPressOptions()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <BaseIcon
                  containerStyle={{ backgroundColor: '#FEA8A1' }}
                  icon={{
                    type: 'material',
                    name: 'language',
                  }}
                />
              }
              rightIcon={<Chevron />}
            />
          </View>
          <InfoText text="More" />
          <View>
            <ListItem
              title="Thông tin về cửa hàng"
              onPress={() => this.onPressOptions()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <BaseIcon
                  containerStyle={{ backgroundColor: '#A4C8F0' }}
                  icon={{
                    type: 'ionicon',
                    name: 'md-information-circle',
                  }}
                />
              }
              rightIcon={<Chevron />}
            />
            <ListItem
              title="Điều khoản và chính sách"
              onPress={() => this.onPressOptions()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <BaseIcon
                  containerStyle={{ backgroundColor: '#C6C7C6' }}
                  icon={{
                    type: 'entypo',
                    name: 'light-bulb',
                  }}
                />
              }
              rightIcon={<Chevron />}
            />

            <ListItem
              title="Đánh giá cửa hàng"
              onPress={() => this.onPressOptions()}
              containerStyle={styles.listItemContainer}
              badge={{
                value: 5,
                textStyle: { color: 'white' },
                containerStyle: { backgroundColor: 'gray', marginTop: 0 },
              }}
              leftIcon={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: '#FECE44',
                  }}
                  icon={{
                    type: 'entypo',
                    name: 'star',
                  }}
                />
              }
              rightIcon={<Chevron />}
            />
            <ListItem
              title="Gửi phản hồi"
              onPress={() => this.onPressOptions()}
              containerStyle={styles.listItemContainer}
              leftIcon={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: '#00C001',
                  }}
                  icon={{
                    type: 'materialicon',
                    name: 'feedback',
                  }}
                />
              }
              rightIcon={<Chevron />}
            />
          </View>
          <View style={{ borderWidth: 1, borderColor: '#DFD8C8' }} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={this.props.requestLogout}>
              <Text style={styles.textLogout}>ĐĂNG XUẤT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Index.propTypes = {};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestLogout: authActions.requestLogout,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Index);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#52575D',
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#414448',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 150,
    left: 10,
    padding: 4,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  add: {
    backgroundColor: '#414448',
    position: 'absolute',
    bottom: 28,
    padding: 3,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  buttonLogout: {
    width: 300,
    height: 40,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogout: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

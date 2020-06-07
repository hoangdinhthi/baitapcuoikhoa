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

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <Icon
              type="Ionicons"
              name="ios-arrow-back"
              size={24}
              color="#52575D"
            />
            <Icon type="Ionicons" name="md-more" size={24} color="#52575D" />
          </View>
          <View style={{ alignSelf: 'center' }}>
            <View style={styles.profileImage}>
              <Image
                source={require('../../Images/pikachu.jpg')}
                style={styles.image}
                resizeMode="center"
              />
            </View>

            <View style={styles.active} />
            <View style={styles.add}>
              <Icon
                type="Ionicons"
                name="ios-add"
                size={48}
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
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
              <Text style={[styles.text, styles.subText]}>Ví</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: '#DFD8C8',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={[styles.text, { fontSize: 24 }]}>45, 844</Text>
              <Text style={[styles.text, styles.subText]}>Ví</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
              <Text style={[styles.text, styles.subText]}>Ví</Text>
            </View>
          </View>
          <View style={{ borderWidth: 1, borderColor: '#DFD8C8' }} />
          <TouchableOpacity onPress={this.props.requestLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
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
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 100,
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
    backgroundColor: 'red',
  },
  dm: {
    backgroundColor: '#414448',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: '#414448',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    flex: 1,
    alignItems: 'center',
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: '#414448',
    position: 'absolute',
    top: '62%',
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  recentItemIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  mainbody: {
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 70,
  },
  imgprofile: {
    marginLeft: 100,
    marginTop: 50,
    height: 120,
    width: 120,
  },
});

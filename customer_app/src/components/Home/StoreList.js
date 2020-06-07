import React, { Component } from 'react'
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
} from 'react-native'
import Proptypes from 'prop-types'

class StoreList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { imageUri, nameStore, locationStore, discountStore } = this.props
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
            source={imageUri}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '400' }}>{nameStore}</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#00ffff' }}>{locationStore}</Text>
          <Text
            style={{
              borderWidth: 1,
              borderColor: '#a9a9a9',
              width: 90,
              borderRadius: 10,
              fontSize: 10,
              fontWeight: '400',
            }}>
            {discountStore}
          </Text>
        </View>
      </View>
    )
  }
}

StoreList.propTypes = {}

export default StoreList

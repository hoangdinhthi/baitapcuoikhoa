import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableHighlight, Dimensions } from 'react-native'
import Proptypes from 'prop-types'
import Icon from '../base/Icon'

class BranchStoreList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigations.navigate('Store')}>
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
              {/* <Text style={styles.flatListItems}> {item.name} </Text>
                            <Text style={styles.flatListItems}> {item.foodDescription} </Text> */}
              <Text style={styles.flatListItems1}> {this.props.item.name} </Text>
              <Text style={styles.flatListItems2}> {this.props.item.foodDescription} </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon type="Ionicons" name="md-star" size={15} />
                <Text style={{ fontSize: 14, fontWeight: '700', marginRight: 50 }}>4.9</Text>
                <Text> 2.6 km </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: '#a9a9a9',
                    width: 60,
                    borderRadius: 5,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'red',
                    marginRight: 20,
                  }}>
                  40% off
                </Text>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: '#a9a9a9',
                    width: 60,
                    borderRadius: 5,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'red',
                    marginRight: 20,
                  }}>
                  FREESHIP
                </Text>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: '#a9a9a9',
                    width: 90,
                    borderRadius: 5,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'red',
                  }}>
                  pickup support
                </Text>
              </View>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: 'white' }} />
        </View>
      </TouchableHighlight>
    )
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
})
BranchStoreList.propTypes = {}

export default BranchStoreList

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Proptypes from 'prop-types';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';

const ListOrder = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, flexDirection: 'column' }} key={item._id}>
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
          <Text style={styles.flatListItems1}>
            Đơn hàng lúc {moment(item.createdAt).format('HH:mm DD/MM')}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetail', {
                orderId: item._id,
              })
            }>
            <Text style={styles.chitietorder}>Chi tiết >></Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: 'white' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListItems1: {
    fontSize: 14,
    fontWeight: '700',
  },
  flatListItems2: {
    color: '#a9a9a9',
  },
  chitietorder: {
    fontSize: 14,
    fontWeight: '700',
  },
});
export default ListOrder;

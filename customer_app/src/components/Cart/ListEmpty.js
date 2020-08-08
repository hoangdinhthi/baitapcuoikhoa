import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Proptypes from 'prop-types';
import { Image } from 'react-native-elements';

const ListEmpty = () => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Image
        source={require('../../Images/empty.png')}
        resizeMode="contain"
        style={{
          width: 70,
          height: 70,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        Chưa có thông tin
      </Text>
    </View>
  );
};

ListEmpty.propTypes = {};

export default ListEmpty;

import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

const Process = () => {
  const isFetching = useSelector(state => state.share.isFetching);
  return (
    <View style={styles.container} pointerEvents="box-none">
      {isFetching ? (
        <>
          <View style={styles.overlay} />
          <View
            style={[
              styles.indicator,
              {
                backgroundColor: '#d2dae2',
              },
            ]}>
            <RNActivityIndicator color={'blue'} size={30} />
            <Text style={styles.txt}>Đang xử lý</Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default Process;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  indicator: {
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 15,
  },
  overlay: {
    opacity: 0.4,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  txt: {
    fontSize: 16,
    marginLeft: 7.5,
    color: 'black',
  },
});

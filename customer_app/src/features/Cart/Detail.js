//@ts-nocheck

import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sharedActions } from '../../reduxapp/reducer/sharedReducer';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import moment from 'moment';
import { formatCurrency } from '../../service/orderService';

const { width } = Dimensions.get('window');

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { route } = this.props;
    this.props.fetchOrderDetail(route.params.orderId);
  }

  renderProgress = step => {
    let rData = step === 3 ? [...data].slice(0, 4) : data;
    return (
      <View
        style={{
          flexDirection: 'row',
          overflow: 'visible',
          height: 85,
        }}>
        {rData.map((el, index) => {
          const greater = index > step;
          const isEqual = step === index;
          const isCanceled = step === 4;
          const notLast = index !== rData.length - 1;
          return (
            <>
              <View
                key={el.status}
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 22,
                    backgroundColor:
                      isCanceled && notLast
                        ? 'red'
                        : greater
                        ? 'grey'
                        : 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {isEqual || greater ? (
                    <View
                      style={{
                        height: 36,
                        width: 36,
                        borderRadius: 18,
                        backgroundColor: isEqual
                          ? 'white'
                          : greater
                          ? 'grey'
                          : 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: greater ? 'white' : 'black',
                        }}>
                        {el.status + 1}
                      </Text>
                    </View>
                  ) : (
                    <Icon
                      name={isCanceled && notLast ? 'close' : 'check'}
                      size={20}
                      color={'white'}
                    />
                  )}
                </View>
                <View
                  style={{
                    position: 'absolute',
                    left: -(width - 30) / (rData.length * 2) + 32,
                    top: 44,
                    width: (width - 30) / rData.length - 20,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      maxWidth: width / rData.length - 10,
                      textAlign: 'center',
                      color: isEqual ? 'green' : 'grey',
                    }}>
                    {el.name}
                  </Text>
                </View>
              </View>

              {index !== rData.length - 1 ? (
                <View
                  style={{
                    flex: 1,
                    height: 44,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 3,
                      backgroundColor: index > step - 1 ? 'grey' : 'green',
                    }}
                  />
                </View>
              ) : null}
            </>
          );
        })}
      </View>
    );
  };

  renderFood = (el, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text>{el.quantity}</Text>
        <Icon name="close" size={24} />
        <View
          style={{
            padding: 15,
            flex: 1,
            elevation: 3,
            backgroundColor: 'white',
            borderRadius: 5,
            marginBottom: 10,
            marginHorizontal: 10,
          }}>
          <Text>{el.food.name}</Text>
          <Text
            style={{
              color: 'grey',
            }}>
            {`${formatCurrency(parseInt(el.food.price))} Đ`}
          </Text>
        </View>
        <Text>=</Text>
        <View
          style={{
            width: 80,
            alignItems: 'center',
          }}>
          <Text>{`${formatCurrency(
            parseInt(el.food.price) * parseInt(el.quantity),
          )} Đ`}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { orderDetail } = this.props;
    const total = orderDetail
      ? orderDetail.orders.reduce(
          (acc, el) => (acc += parseInt(el.food.price) * parseInt(el.quantity)),
          0,
        )
      : 0;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() =>
              this.props.fetchOrderDetail(this.props.route.params.orderId)
            }
          />
        }>
        {orderDetail ? (
          <View
            style={{
              flex: 1,
              padding: 15,
            }}>
            <Text style={styles.title}>Trạng thái</Text>
            {this.renderProgress(orderDetail.status ?? 0)}
            <Text style={styles.title}>
              Ngày đặt:{' '}
              {moment(orderDetail.createdAt).format('HH:mm DD/MM/YYYY')}
            </Text>
            <Text style={styles.title}>Danh sách món ăn</Text>
            {orderDetail.orders.map(this.renderFood)}
            <Text style={styles.title}>
              Tổng tiền: {formatCurrency(total)} Đ
            </Text>
          </View>
        ) : null}
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  orderDetail: state.share.orderDetail,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrderDetail: sharedActions.fetchOrderDetail,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

const data = [
  {
    name: 'Mới tạo',
    status: 0,
  },
  {
    name: 'Đã duyệt',
    status: 1,
  },
  {
    name: 'Giao hàng',
    status: 2,
  },
  {
    name: 'Hoàn thành',
    status: 3,
  },
  {
    name: 'Hủy',
    status: 4,
  },
];

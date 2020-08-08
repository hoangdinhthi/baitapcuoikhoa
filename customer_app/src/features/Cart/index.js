import React, { Component } from 'react';
import { Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListOrder from '../../components/Cart/ListOrder';
import { sharedActions } from '../../reduxapp/reducer/sharedReducer';
import ListEmpty from '../../components/Cart/ListEmpty';

const { width } = Dimensions.get('window');
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { Orders } = this.props;
    console.log(Orders);
    return (
      <FlatList
        data={Orders ? Orders : []}
        renderItem={({ item, index }) => {
          return <ListOrder item={item} index={index} />;
        }}
        ListEmptyComponent={<ListEmpty />}
        keyExtractor={item => `${item._id}`}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={this.props.fetchOrders}
          />
        }
      />
    );
  }
}

Cart.propTypes = {};

const styles = StyleSheet.create({
  flatListItems1: {
    fontSize: 14,
    fontWeight: '700',
  },
  flatListItems2: {
    color: '#a9a9a9',
  },
});
const mapStateToProps = state => ({
  Orders: state.share.orders,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrders: sharedActions.fetchOrders,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

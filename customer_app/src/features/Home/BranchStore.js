import React, { Component } from 'react';
import { Text, View, SafeAreaView, Platform, FlatList } from 'react-native';
import Proptypes from 'prop-types';
import BranchStoreList from '../../components/Home/BranchStoreList';
import listBranch from '../../data/ListBranchStore';
import { sharedActions } from '../../reduxapp/reducer/sharedReducer';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

class BranchStore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchFoodPreview();
  }

  render() {
    const { foods } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={foods ? foods : []}
              renderItem={({ item, index }) => {
                return (
                  <BranchStoreList
                    item={item}
                    index={index}
                    navigations={this.props.navigation}
                  />
                );
              }}
              keyExtractor={item => `${item.name}`}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

BranchStore.propTypes = {};
const mapStateToProps = state => ({
  foods: state.share.foods,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchFoodPreview: sharedActions.fetchFoodPreview,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BranchStore);

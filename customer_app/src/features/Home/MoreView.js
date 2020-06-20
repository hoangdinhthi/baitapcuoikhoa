import React, { Component } from 'react';
import { Text, View, SafeAreaView, Platform, FlatList } from 'react-native';
import Proptypes from 'prop-types';
import BranchStoreList from '../../components/Home/BranchStoreList';
import listBranch from '../../data/ListBranchStore';
import { sharedActions } from '../../reduxapp/reducer/sharedReducer';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
class MoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchSlugFoods(this.props.route.params.slugName);
  }

  render() {
    const { slugFoods } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={slugFoods ? slugFoods : []}
              renderItem={({ item }) => {
                return (
                  <BranchStoreList
                    item={item}
                    navigations={this.props.navigation}
                  />
                );
              }}
              keyExtractor={item => `${item.id}`}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

MoreView.propTypes = {};
const mapStateToProps = state => ({
  slugFoods: state.share.slugFoods,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSlugFoods: sharedActions.fetchSlugFoods,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(MoreView);

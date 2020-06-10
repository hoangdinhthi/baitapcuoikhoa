import React, { Component } from 'react';
import { Text, View, SafeAreaView, Platform, FlatList } from 'react-native';
import Proptypes from 'prop-types';
import BranchStoreList from '../../components/Home/BranchStoreList';
import listBranch from '../../data/ListBranchStore';

class BranchStore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={listBranch}
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

export default BranchStore;

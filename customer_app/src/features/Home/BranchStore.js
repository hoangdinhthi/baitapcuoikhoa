import React, { Component } from 'react';
import { Text, View, SafeAreaView, Platform, FlatList } from 'react-native';
import Proptypes from 'prop-types';
import BranchStoreList from '../../components/Home/BranchStoreList';
import listBranch from '../../data/ListBranchStore';
import { sharedActions } from '../../reduxapp/reducer/sharedReducer';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  List,
} from 'native-base';
import _ from 'lodash';

class BranchStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fullData: [],
      query: '',
    };
  }
  componentDidMount() {
    this.props.fetchFoodPreview();
    this.setState({ data: this.props.foods });
  }
  _renderItem = ({ item, index }) => {
    return (
      <BranchStoreList
        item={item}
        index={index}
        navigations={this.props.navigation}
      />
    );
  };
  handleSearch = text => {
    const formattedQuery = text;
    this.setState({ fullData: this.props.foods });
    const data = _.filter(this.state.fullData, food => {
      if (food.name.includes(formattedQuery)) {
        return true;
      }
      return false;
    });
    this.setState({ data: data, query: text });
  };
  render() {
    const { foods } = this.props;
    console.log(this.props.route.params.status);
    if (this.props.route.params.status === 1) {
      return (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" onChangeText={this.handleSearch} />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <List>
            <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={item => `${item.name}`}
            />
          </List>
        </Container>
      );
    }
    if (this.props.route.params.status === 0) {
      return (
        <>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
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
        </>
      );
    }
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

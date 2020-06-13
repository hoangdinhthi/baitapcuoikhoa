import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Proptypes from 'prop-types'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
}
  componentDidMount(){
    this.props.fetchFoodsSlug(route.params.slugName);
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

Index.propTypes = {}

const mapStateToProps = state => ({
  foodsSlug: state.share.slugFoods,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchFoodsSlug: sharedActions.fetchFoodsSlug,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Index);


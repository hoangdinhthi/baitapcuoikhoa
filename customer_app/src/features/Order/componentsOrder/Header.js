import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleIsAdding } from '../../../reduxapp/actionCreator'

class Index extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#D9D9D9', alignItems: 'center' }}>
        <Text>My Project</Text>
        <TouchableOpacity onPress={() => this.props.myToggleIsAdding()}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Index.propTypes = {}

export default connect(null, { myToggleIsAdding: toggleIsAdding })(Index)

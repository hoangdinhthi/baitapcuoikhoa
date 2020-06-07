import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Proptypes from 'prop-types'

import { connect } from 'react-redux'

class Filter extends Component {
  getTextStyle(statusName) {
    const { myFilterstatus } = this.props
    if (statusName === myFilterstatus) return { color: 'yellow', fontWeight: 'bold' }
    return styles.buttonText
  }

  _onPress(actionType) {
    this.props.dispatch({ type: actionType })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._onPress('FILTER_SHOW_ALL')}>
          <Text style={this.getTextStyle('SHOW_ALL')}> SHOW ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._onPress('FILTER_MEMORIZED')}>
          <Text style={this.getTextStyle('MEMORIZED')}> MEMORIZED</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._onPress('FILTER_NEED_PRACTICE')}>
          <Text style={this.getTextStyle('NEED_PRACTICE')}> NEED PRACTICE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Filter.propTypes = {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#583C3C',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
})

function mapStateToProps(state) {
  return { myFilterstatus: state.filterStatus }
}
export default connect(mapStateToProps)(Filter)

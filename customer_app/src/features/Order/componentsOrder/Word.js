import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'
import { connect } from 'react-redux'

class Word extends Component {
  memorizedWord() {
    this.props.dispatch({
      type: 'TOGGLE_MEMORIZED',
      id: this.props.myWord.id,
    })
  }

  showdWord() {
    this.props.dispatch({
      type: 'TOGGLE_SHOW',
      id: this.props.myWord.id,
    })
  }

  changeNameText(memorized) {
    return memorized ? 'foget' : 'memorized'
  }

  changeNameShow(isShow) {
    return isShow ? 'hidden' : 'Show'
  }

  render() {
    const { en, vn, memorized, isShow } = this.props.myWord
    const textDecorationLine = memorized ? 'line-through' : 'none'
    const textTranSlate = isShow ? vn : '--------------'
    return (
      <View style={styles.container}>
        <Text style={{ textDecorationLine }}>{en}</Text>
        <Text>{textTranSlate}</Text>
        <View style={styles.controller}>
          <TouchableOpacity style={styles.buttons} onPress={this.memorizedWord.bind(this)}>
            <Text>{this.changeNameText(memorized)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={this.showdWord.bind(this)}>
            <Text>{this.changeNameShow(isShow)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Word.propTypes = {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D2DEF6',
    padding: 10,
    margin: 10,
  },
  controller: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
  },
})
export default connect()(Word)

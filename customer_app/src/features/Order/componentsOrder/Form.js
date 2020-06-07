import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Proptypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleAddWord, toggleIsAdding } from '../../../reduxapp/actionCreator'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      en: '',
      vn: '',
    }
    this.onAdd = this.onAdd.bind(this)
  }

  onAdd() {
    const { en, vn } = this.state
    this.props.toggleAddWord(en, vn)
    this.props.toggleIsAdding()
  }

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.container}
          value={this.state.en}
          onChangeText={text => this.setState({ en: text })}
        />
        <TextInput
          style={styles.container}
          value={this.state.vn}
          onChangeText={text => this.setState({ vn: text })}
        />
        <TouchableOpacity onPress={this.onAdd}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Index.propTypes = {}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    backgroundColor: '#E4F6D4',
    paddingHorizontal: 10,
    margin: 10,
  },
})
export default connect(null, { toggleAddWord, toggleIsAdding })(Index)

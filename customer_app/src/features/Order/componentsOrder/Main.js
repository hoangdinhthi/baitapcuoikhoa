import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'
import { connect } from 'react-redux'
import Word from './Word'
import Filter from './Filter'
import Header from './Header'
import Form from './Form'

class Main extends Component {
  getWordList() {
    const { myFilter, myWords } = this.props
    if (myFilter === 'MEMORIZED') return myWords.filter(e => e.memorized)
    if (myFilter === 'NEED_PRACTICE') return myWords.filter(e => !e.memorized)
    return myWords
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={{ flex: 10 }}>
          {this.props.myIsAdding ? <Form />: null}
          <FlatList
            data={this.getWordList()}
            renderItem={({ item }) => <Word myWord={item} />}
            keyExtractor={item => item.id}
          />
        </View>
        <Filter />
      </View>
    )
  }
}

Main.propTypes = {}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
})

function mapStateToProps(state) {
  return {
    myFilter: state.filterStatus,
    myWords: state.arrWords,
    myIsAdding: state.isAdding
  }
}
export default connect(mapStateToProps)(Main)

import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Proptypes from 'prop-types'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Main from './componentsOrder/Main'
import store from '../../reduxapp/store'

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

Index.propTypes = {}

export default Index

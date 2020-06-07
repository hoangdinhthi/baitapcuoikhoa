import React from 'react'
import { Text, TextProps } from 'react-native'

class Index extends React.PureComponent<TextProps> {
  render() {
    const { children, ...restProps } = this.props
    return <Text {...restProps}>{children}</Text>
  }
}

export default Index

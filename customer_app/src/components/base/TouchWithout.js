/* eslint-disable no-undef */
import React from 'react'
import { TouchableOpacity } from 'react-native'

declare type Props = React.ComponentProps<typeof TouchableOpacity>

class Index extends React.PureComponent<Props> {
  render() {
    const { children, ...restProps } = this.props
    return (
      <TouchableOpacity
        hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
        activeOpacity={1}
        {...restProps}>
        {children}
      </TouchableOpacity>
    )
  }
}

export default Index

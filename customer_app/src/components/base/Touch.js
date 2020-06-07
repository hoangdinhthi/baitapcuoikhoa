/* eslint-disable no-undef */
import React from 'react'
import { TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

declare type Props = React.ComponentProps<typeof TouchableWithoutFeedback> & {
  /**
   * Whether to render the ripple outside the view bounds.
   */
  borderless?: boolean,
  /**
   * Type of background drawabale to display the feedback (Android).
   * https://facebook.github.io/react-native/docs/touchablenativefeedback.html#background
   */
  background?: Object,
  /**
   * Whether to start the ripple at the center (Web).
   */
  centered?: boolean,
  /**
   * Whether to prevent interaction with the touchable.
   */
  disabled?: boolean,
  /**
   * Function to execute on press. If not set, will cause the touchable to be disabled.
   */
  onPress?: () => void | null,
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void,
  /**
   * Color of the ripple effect (Android >= 5.0 and Web).
   */
  rippleColor?: string,
  /**
   * Color of the underlay for the highlight effect (Android < 5.0 and iOS).
   */
  underlayColor?: string,
  /**
   * Content of the `TouchableRipple`.
   */
  children: React.ReactNode,
  style?: StyleProp<ViewStyle>,
  /**
   * @optional
   */
  //   theme: Theme,
}

class Index extends React.PureComponent<Props> {
  render() {
    const { children, ...restProps } = this.props
    return (
      <TouchableRipple hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }} {...restProps}>
        {children}
      </TouchableRipple>
    )
  }
}

export default Index

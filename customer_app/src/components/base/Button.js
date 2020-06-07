import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, scales } from '../../config';
import { elevationShadowStyle } from '../../config/Theme/elevation';
import Touch from './Touch';

// dùng hêt button bằng thằng này
class Button extends React.PureComponent {
  render() {
    const { isLoading, title, titleStyle, style, ...restProps } = this.props;
    return (
      <Touch
        style={StyleSheet.compose(styles.container, style)}
        rippleColor={colors.white}
        centered
        {...restProps}>
        <Text
          style={StyleSheet.compose(styles.titleStyle, titleStyle)}
          numberOfLines={1}>
          {title}
        </Text>
      </Touch>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scales.moderateScale(12),
    paddingHorizontal: scales.moderateScale(24),
    ...elevationShadowStyle(5),
    borderRadius: 5,
  },
  titleStyle: {
    fontSize: scales.moderateScale(14),
    color: colors.white,
  },
});

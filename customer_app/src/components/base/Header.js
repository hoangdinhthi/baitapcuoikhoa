import Proptypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { getStatusBarHeight } from '../../commons';
import { colors, scales } from '../../config';
import { elevationShadowStyle } from '../../config/Theme/elevation';
import Icon from './Icon';

// thăng này
class Headers extends React.PureComponent {
  render() {
    const {
      renderRight,
      goBack,
      titleStyle = {},
      title,
      style,
      customBack,
      ...restProps
    } = this.props;
    return (
      <View
        style={[
          {
            ...elevationShadowStyle(5),
            backgroundColor: colors.primary,
            paddingTop: getStatusBarHeight(),
          },
          style,
        ]}
        {...restProps}>
        <View style={styles.container}>
          <View style={styles.viewContent}>
            <Text style={[styles.txtTitle, titleStyle]}>
              {title && title.toUpperCase()}
            </Text>
          </View>
          <View style={styles.overView}>
            {typeof goBack === 'function' ? (
              <TouchableRipple rippleColor={colors.white} onPress={goBack}>
                {customBack || (
                  <Icon
                    type="MaterialIcons"
                    name="arrow-back"
                    size={30}
                    color={colors.white}
                  />
                )}
              </TouchableRipple>
            ) : (
              <View style={{ width: 30, height: 30 }} />
            )}

            {typeof renderRight === 'function' ? renderRight() : renderRight}
          </View>
        </View>
      </View>
    );
  }
}

Headers.propTypes = {
  renderRight: Proptypes.any,
  title: Proptypes.string,
  titleStyle: Proptypes.any,
  goBack: Proptypes.func,
  style: Proptypes.any,
  customBack: Proptypes.node,
};

export default Headers;

const styles = StyleSheet.create({
  viewContent: { justifyContent: 'center', flex: 1 },
  txtTitle: {
    textAlign: 'center',
    fontSize: scales.moderateScale(17),
    fontWeight: 'bold',
    color: colors.white,
  },
  container: { width: '100%', height: 56 },
  overView: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});

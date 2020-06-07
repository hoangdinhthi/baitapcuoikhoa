import React, { Component } from 'react';
import { Animated, Dimensions, ScrollView } from 'react-native';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import Proptypes from 'prop-types';
import { elevationShadowStyle } from '../../config/Theme/elevation';

const { height: heightD } = Dimensions.get('window');
const heightDevice = heightD + 50;

class Index extends Component {
  static popUpInstance;

  static onShow = (children, config = {}) => {
    if (!children || children.lengh > 1) {
      return;
    }
    this.popUpInstance.show(children, config);
  };

  static onHide = () => {
    this.popUpInstance.hide();
  };

  static onGetVisible = () => {
    this.popUpInstance.getVisible();
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      children: null,
      contentHeight: heightDevice,
      layoutHeight: heightDevice,
    };
    this.animation = new Animated.Value(0);
    this.gestureX = new Animated.Value();
    this.gestureY = new Animated.Value(heightDevice);
    this.config = {};
    this.gestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.gestureX,
            translationY: this.gestureY,
          },
        },
      ],
      {
        listener: this.onGestureEvent,
      },
    );
    this.hideDuration = 300;
    this.scroll = React.createRef();
    this.modalChildren = React.createRef();
    this.modalContentView = React.createRef();

    this.beginScrollY = new Animated.Value(0);
    this.onScrollBeginDrag = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.beginScrollY } } }],
      {
        useNativeDriver: false,
      },
    );

    this.translateY = new Animated.Value(0);

    this.test = Animated.add(
      this.gestureY,
      Animated.multiply(-1, this.beginScrollY),
    );

    // this.beginScrollY.addListener(({ value }) => console.log(value))

    this.styleTranslateY = Animated.add(
      0,
      Animated.add(this.gestureY, Animated.multiply(-1, this.beginScrollY)),
    );
    this.contentSize = heightDevice;
  }

  getVisible = () => {
    return this.styleTranslateY.__getValue() === 0;
  };

  onGestureEvent = () => {
    // console.log(e.nativeEvent)
  };

  onHandlerStateChange = e => {
    const { translationY, state } = e.nativeEvent;

    if (state === 5) {
      const { contentHeight, layoutHeight } = this.state;
      this.type = translationY > 0;
      if (
        (this.styleTranslateY.__getValue() <
          -Math.max(contentHeight - layoutHeight + 200, 200) &&
          !this.type) ||
        (this.styleTranslateY.__getValue() > 200 && this.type)
      ) {
        this.hideDuration = 300 - Math.abs((translationY / heightDevice) * 300);

        this.hide();
      } else {
        Animated.timing(this.gestureY, {
          toValue: 0,
          duration: (300 * 200) / heightDevice,
        }).start();
      }
    }
  };

  show = (children, config = {}) => {
    this.config = config;
    this.type = true;
    this.setState({ children }, () => {
      Animated.timing(this.gestureY, {
        toValue: 0,
        duration: 300,
      }).start();
    });
  };

  hide = () => {
    Animated.timing(this.gestureY, {
      toValue: this.type ? heightDevice : -heightDevice,
      duration: this.hideDuration,
    }).start(() =>
      this.setState({ children: null }, () => {
        this.gestureY.setValue(heightDevice);
        this.translateY.setValue(0);
        this.beginScrollY.setValue(0);
      }),
    );
  };

  onLayout = e => {
    const { layout } = e.nativeEvent;
    this.setState({ layoutHeight: layout.height });
  };

  onContentSizeChange = (width, height) => {
    this.setState({ contentHeight: height });
  };

  render() {
    const { isVisible, children, contentHeight, layoutHeight } = this.state;
    const { children: childProp } = this.props;

    let translateY;

    if (contentHeight > layoutHeight) {
      translateY = this.styleTranslateY.interpolate({
        inputRange: [
          -contentHeight - 1,
          -contentHeight,
          -contentHeight + layoutHeight,
          0,
          layoutHeight,
          layoutHeight + 1,
        ],
        outputRange: [
          -layoutHeight,
          -layoutHeight,
          0,
          0,
          layoutHeight,
          layoutHeight,
        ],
        extrapolate: 'clamp',
      });
    } else {
      translateY = this.styleTranslateY.interpolate({
        inputRange: [
          -layoutHeight - 1,
          -layoutHeight,
          0,
          0,
          layoutHeight,
          layoutHeight + 1,
        ],
        outputRange: [
          -layoutHeight,
          -layoutHeight,
          0,
          0,
          layoutHeight,
          layoutHeight,
        ],
        extrapolate: 'clamp',
      });
    }

    if (isVisible)
      return (
        <Animated.View
          style={{
            bottom: 0,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            transform: [{ translateX: 0 }, { translateY }],
            backgroundColor: '#fff',
            ...elevationShadowStyle(3),
          }}>
          <PanGestureHandler
            enabled={false}
            ref={this.modalChildren}
            simultaneousHandlers={[this.modalContentView]}
            shouldCancelWhenOutside={false}
            onGestureEvent={this.gestureEvent}
            onHandlerStateChange={this.onHandlerStateChange}>
            <NativeViewGestureHandler
              enabled={false}
              ref={this.modalContentView}
              simultaneousHandlers={this.modalChildren}>
              {this.config.isUseScrollView ? (
                <ScrollView
                  onScrollBeginDrag={this.onScrollBeginDrag}
                  bounces={false}
                  removeClippedSubviews
                  onLayout={this.onLayout}
                  onContentSizeChange={this.onContentSizeChange}>
                  {children || childProp}
                </ScrollView>
              ) : (
                <Animated.View style={{ flex: 1 }}>
                  {children || childProp}
                </Animated.View>
              )}
            </NativeViewGestureHandler>
          </PanGestureHandler>
        </Animated.View>
      );
    return null;
  }
}

Index.propTypes = {
  children: Proptypes.any,
};

export default Index;

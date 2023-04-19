/* eslint-disable react-native/no-inline-styles */
import {getSize, height} from '@utils/responsive';
import React from 'react';
import {Animated} from 'react-native';

const ITEM_SIZE = getSize.s(35);
const MAX_HEIGHT = height - getSize.m(180);

const AnimatedCart = ({source, animatedValue}) => {
  const translateY = animatedValue.interpolate({
    inputRange: [0, MAX_HEIGHT],
    outputRange: [0, -MAX_HEIGHT],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 15, MAX_HEIGHT],
    outputRange: [0, 1.3, 1],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [
      0,
      MAX_HEIGHT - 300,
      MAX_HEIGHT - 250,
      MAX_HEIGHT - 200,
      MAX_HEIGHT - 150,
      MAX_HEIGHT - 100,
      MAX_HEIGHT - 50,
      MAX_HEIGHT,
    ],
    outputRange: [0, 100, 110, 120, 130, 140, 150, 160],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 15, MAX_HEIGHT - 30, MAX_HEIGHT],
    outputRange: [1, 1, 0.5, 0],
  });

  const animatedContainerStyle = {
    opacity,
    transform: [{translateY}, {translateX}, {scale}],
  };

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        ...animatedContainerStyle,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: getSize.m(12 + 45 + 180 / 2 - 18 / 2),
        bottom: 90,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: ITEM_SIZE,
      }}>
      <Animated.Image
        style={{
          width: ITEM_SIZE,
          height: ITEM_SIZE,
          borderRadius: ITEM_SIZE,
        }}
        source={{uri: source}}
      />
    </Animated.View>
  );
};

export default AnimatedCart;

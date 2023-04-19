import {getSize} from '@utils/responsive';
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Image = ({
  source,
  width,
  height,
  padding,
  margin,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  radius,
  style,
  resizeMode = 'cover',
  ...rest
}) => {
  const imageStyle = [
    width && {width: width},
    height && {height: height},
    padding && {padding: getSize.m(padding)},
    margin && {margin: getSize.m(margin)},
    paddingTop && {paddingTop: getSize.m(paddingTop)},
    paddingBottom && {paddingBottom: getSize.m(paddingBottom)},
    paddingLeft && {paddingLeft: getSize.m(paddingLeft)},
    paddingRight && {paddingRight: getSize.m(paddingRight)},
    marginTop && {marginTop: getSize.m(marginTop)},
    marginBottom && {marginBottom: getSize.m(marginBottom)},
    marginLeft && {marginLeft: getSize.m(marginLeft)},
    marginRight && {marginRight: getSize.m(marginRight)},
    paddingHorizontal && {paddingHorizontal: getSize.m(paddingHorizontal)},
    paddingVertical && {paddingVertical: getSize.m(paddingVertical)},
    marginHorizontal && {marginHorizontal: getSize.m(marginHorizontal)},
    marginVertical && {marginVertical: getSize.m(marginVertical)},
    radius && {borderRadius: getSize.s(radius)},
    {...StyleSheet.flatten(style)},
  ];

  return (
    <FastImage
      {...rest}
      source={source}
      style={imageStyle}
      resizeMode={FastImage.resizeMode[resizeMode]}
    />
  );
};

export default Image;

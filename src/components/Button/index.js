/* eslint-disable react-native/no-inline-styles */
import {Text} from '@components';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import React from 'react';
import {Pressable} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import styles from './styles';

const Button = ({
  title,
  onPress,
  style,
  titleStyle,
  backgroundColor,
  disabled,
}) => {
  const config = useSelector(state => state.config.data);

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          backgroundColor ? backgroundColor : config.general_background_color
        }
        style={{...styles.container, opacity: disabled ? 0.7 : 1, ...style}}>
        {disabled ? (
          <UIActivityIndicator size={getSize.s(20)} color="white" />
        ) : (
          <Text
            fontType="semibold"
            color={config.general_font_color || theme.colors.white}
            style={titleStyle}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </Pressable>
  );
};

export default Button;

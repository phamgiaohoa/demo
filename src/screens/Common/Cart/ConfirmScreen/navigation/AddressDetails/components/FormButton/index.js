/* eslint-disable no-unused-vars */
import {icons} from '@assets';
import {Block, Text} from '@components';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {useField} from 'formik';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const FormButton = ({name, label, onPress}) => {
  const [feild, meta, helpers] = useField({name});
  const isError = meta.touched && meta.error;

  const getStyleButton = pressed => {
    const borderColor = isError
      ? theme.colors.red
      : pressed
      ? theme.colors.blue
      : theme.colors.smoke;
    const borderBottomWidth = !isError
      ? getSize.m(1)
      : pressed
      ? getSize.m(2)
      : getSize.m(1);
    return {
      borderColor,
      borderBottomWidth,
    };
  };

  const _renderError = errorText => {
    return (
      errorText && (
        <Block row alignCenter paddingVertical={5}>
          <Image
            source={icons.warning}
            resizeMode="contain"
            style={styles.icoWarning}
          />
          <Text marginLeft={5} size={11} color={theme.colors.red}>
            {errorText}
          </Text>
        </Block>
      )
    );
  };

  return (
    <Block>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [getStyleButton(pressed), styles.btnSelect]}>
        <Text>{label}</Text>
        <Image style={styles.icon} source={icons.down} resizeMode="contain" />
      </Pressable>
      {_renderError(isError)}
    </Block>
  );
};

export default FormButton;

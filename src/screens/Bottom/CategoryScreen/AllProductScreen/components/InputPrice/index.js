import {icons} from '@assets';
import {Block} from '@components';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import styles from './styles';

const InputPrice = ({inputRef, placeholder, value, onChangeText, onFocus}) => {
  const _onCloseInput = () => {
    inputRef.current?._inputElement?.clear();
    inputRef.current?._inputElement?.focus();
  };

  return (
    <Block
      flex
      row
      alignCenter
      radius={5}
      paddingRight={10}
      backgroundColor="smoke">
      <TextInputMask
        ref={inputRef}
        style={styles.input}
        type={'money'}
        options={{
          precision: 0,
          separator: '',
          delimiter: '.',
          unit: '',
          suffixUnit: '',
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
      <Pressable onPress={_onCloseInput} style={styles.btnClose}>
        <Image style={styles.iconClose} source={icons.close} />
      </Pressable>
    </Block>
  );
};

export default InputPrice;

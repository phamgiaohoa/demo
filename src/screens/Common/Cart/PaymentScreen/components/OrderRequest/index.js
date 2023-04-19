import {Block, Text} from '@components';
import {theme} from '@theme';
import I18n from 'i18n';
import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';

const OrderRequest = ({onChangeText}) => {
  return (
    <Block marginTop={10} backgroundColor={theme.colors.white} padding={10}>
      <Text>{I18n.t('cart.request')}</Text>

      <TextInput
        style={styles.input}
        placeholder={I18n.t('cart.request')}
        multiline
        onChangeText={onChangeText}
      />
    </Block>
  );
};

export default OrderRequest;

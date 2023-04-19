import {Block, Text} from '@components';
import {theme} from '@theme';
import I18n from 'i18n';
import React from 'react';
import {Pressable} from 'react-native';

const Address = ({address, onPress, ...props}) => {
  return (
    <Block {...props} padding={12} backgroundColor="white">
      <Block row space="between">
        <Text fontType="bold">{I18n.t('cart.address')}</Text>
        {onPress && (
          <Pressable onPress={onPress}>
            <Text color={theme.colors.red}>{I18n.t('cart.change')}</Text>
          </Pressable>
        )}
      </Block>

      {address && (
        <Block>
          <Text lineHeight={30} size={15} fontType="bold">
            {address.full_name} - {address.phone}
          </Text>
          <Text color={theme.colors.placeholder}>
            {address.address}, {address.ward_text}, {address.district_text},{' '}
            {address.province_text}
          </Text>
        </Block>
      )}
    </Block>
  );
};

export default Address;

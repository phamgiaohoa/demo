import {icons} from '@assets';
import {Block, Text} from '@components';
import {theme} from '@theme';
import I18n from 'i18n';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const Payment = ({orderMethod, onPress, ...props}) => {
  return (
    <Block {...props} backgroundColor={theme.colors.white} padding={10}>
      <Block row space="between" marginBottom={5}>
        <Text fontType="bold">{I18n.t('cart.payment')}</Text>
        {onPress && (
          <Pressable onPress={onPress}>
            <Text color={theme.colors.red}>{I18n.t('cart.change')}</Text>
          </Pressable>
        )}
      </Block>
      <Block style={styles.btnSelect}>
        <Image
          style={styles.check}
          source={icons.checkCircle}
          resizeMode="contain"
        />
        <Text>{orderMethod?.title}</Text>
      </Block>
    </Block>
  );
};

export default Payment;

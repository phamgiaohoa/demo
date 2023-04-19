import {Block, Text} from '@components';
import {theme} from '@theme';
import I18n from 'i18n';
import React from 'react';

const Delivery = ({orderShip, ...props}) => {
  return (
    <Block {...props} backgroundColor={theme.colors.white} padding={10}>
      <Block marginBottom={5}>
        <Text fontType="bold">{I18n.t('cart.formDelivery')}</Text>
      </Block>

      <Text>{orderShip?.title}</Text>
    </Block>
  );
};

export default Delivery;

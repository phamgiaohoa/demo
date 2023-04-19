import {Block, Text} from '@components';
import {convertCurrency} from '@utils/helper';
import I18n from 'i18n-js';
import React from 'react';

const VALUE_STYLE = {color: 'black', fonType: 'regular', size: 14};

const HStack = ({label, value = 0, suffix = '', valueStyle = VALUE_STYLE}) => {
  valueStyle = {...VALUE_STYLE, ...valueStyle};

  return (
    <Block row alignCenter space="between">
      <Text>{label}</Text>
      <Text
        flex
        right
        numberOfLines={1}
        size={valueStyle?.size}
        color={valueStyle?.color}
        fontType={valueStyle?.fonType}>
        {value ? suffix : ''}
        {value} VNĐ
      </Text>
    </Block>
  );
};

const InfoTotal = ({info}) => {
  return (
    <Block
      isPaddingIos
      padding={12}
      borderTopWidth={1}
      borderColor="background"
      backgroundColor="white">
      <Text size={15} marginBottom={5} fontType="bold">
        {I18n.t('referredPeople.Note')}:
      </Text>
      <Block row alignCenter>
        <Block width="70%">
          <Text>{I18n.t('referredPeople.Maximum')}: </Text>
        </Block>
        <Block width="30%" alignEnd>
          <Text>{convertCurrency(info?.max_commission_per_item)} VNĐ</Text>
        </Block>
      </Block>
      <HStack
        label={I18n.t('referredPeople.TotalBill')}
        value={convertCurrency(info?.total_order)}
      />
      <HStack
        label={I18n.t('referredPeople.TotalInvoice')}
        value={convertCurrency(info?.total_order_after_promotion)}
      />
      <HStack
        label={I18n.t('referredPeople.Estimated')}
        value={convertCurrency(info?.total_expected_commission)}
      />
      <Block row alignCenter space="between">
        <Text>{I18n.t('referredPeople.OrderStatus')}</Text>
        <Text fontType="bold">{info?.order_status}</Text>
      </Block>
      <Block row alignCenter space="between">
        <Text>{I18n.t('referredPeople.Rosestatus')}</Text>
        <Text fontType="bold">{info?.commission_status}</Text>
      </Block>
    </Block>
  );
};

export default InfoTotal;

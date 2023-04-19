/* eslint-disable react-native/no-inline-styles */
import {Block, Text} from '@components';
import {convertCurrency} from '@utils/helper';
import React from 'react';

const VALUE_STYLE = {color: 'black', fonType: 'regular', size: 14};

const HStack = ({label, value = 0, suffix = '', valueStyle = VALUE_STYLE}) => {
  valueStyle = {...VALUE_STYLE, ...valueStyle};

  return (
    <Block row alignCenter marginBottom={5} space="between">
      <Text flex numberOfLines={1}>
        {label}
      </Text>
      <Text
        flex
        right
        numberOfLines={1}
        size={valueStyle?.size}
        color={valueStyle?.color}
        fontType={valueStyle?.fonType}>
        {value ? suffix : ''}
        {convertCurrency(value)} đ
      </Text>
    </Block>
  );
};

const InfoTotal = ({info}) => {
  return (
    <Block
      isPaddingIos
      paddingTop={12}
      paddingHorizontal={12}
      borderTopWidth={1}
      borderColor="background"
      backgroundColor="white">
      <Text size={15} marginBottom={5} fontType="bold">
        Tổng hoa hồng
      </Text>
      <HStack label="Nhận được:" value={info?.total_commissions} />
      <HStack
        label="Đã chuyển thành điểm:"
        value={info?.swap_commmission}
        suffix="-"
      />
      <HStack
        label="Hiện tại:"
        value={info?.user_commission}
        valueStyle={{color: 'red', fonType: 'semibold', size: 15}}
      />
    </Block>
  );
};

export default InfoTotal;

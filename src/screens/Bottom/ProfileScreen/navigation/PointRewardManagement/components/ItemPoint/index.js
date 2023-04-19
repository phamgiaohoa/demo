import {Block, Text} from '@components';
import {convertCurrency} from '@utils/helper';
import moment from 'moment';
import React from 'react';

const RowItem = ({
  isStt = false,
  label,
  value,
  valueColor = 'black',
  suffix = '',
  ...rest
}) => {
  return (
    <Block flex row alignCenter {...rest}>
      <Text size={13}>
        {label}
        {isStt ? ' ' : ': '}
      </Text>
      <Text
        flex
        numberOfLines={1}
        size={15}
        color={valueColor}
        fontType={isStt ? 'regular' : 'semibold'}>
        {suffix}
        {value}
      </Text>
    </Block>
  );
};

const ItemPoint = ({item, index}) => {
  return (
    <Block
      radius={5}
      paddingHorizontal={12}
      paddingVertical={9}
      backgroundColor="white">
      <Block row alignCenter space="between">
        <RowItem isStt label="STT" value={index + 1} />
        <Text size={12} fontType="light">
          {moment(item?.date_create * 1000).format('DD/MM/YYYY')}
        </Text>
      </Block>

      <RowItem label="Hình thức" value={item?.exchange_type} />
      <RowItem
        label="Đơn hàng / Số tiền HH đổi"
        value={convertCurrency(item?.total_amount)}
      />
      <RowItem
        label="Tích lũy / Dùng điểm"
        value={item?.value}
        valueColor="darkBlue"
        suffix="+"
      />
      <RowItem
        label="Số dư cuối"
        value={`${item?.wcoin_after} điểm`}
        valueColor="lightRed"
      />
    </Block>
  );
};

export default ItemPoint;

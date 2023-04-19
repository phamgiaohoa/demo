import {Block, Text} from '@components';
import {convertCurrency} from '@utils/helper';
import moment from 'moment';
import React from 'react';

const RowItem = ({
  isStt = false,
  label,
  value,
  valueColor = 'black',
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
        {value}
      </Text>
    </Block>
  );
};

const ItemPoint = ({item}) => {
  return (
    <Block
      radius={5}
      paddingHorizontal={12}
      paddingVertical={9}
      backgroundColor="white">
      <Block row alignCenter space="between">
        <RowItem isStt label="STT" value={item?.stt} />
        <Text size={12} fontType="light">
          {moment(item?.date_create * 1000).format('DD/MM/YYYY')}
        </Text>
      </Block>

      <RowItem
        label="Hoa hồng đang có"
        value={`${convertCurrency(item?.commission_before)} VNĐ`}
      />
      <RowItem
        label="Số tiền chuyển đổi"
        value={`-${convertCurrency(item?.total_amount)} VNĐ`}
        valueColor="lightRed"
      />
      <RowItem
        label="Số điểm nhận được"
        value={item?.value}
        valueColor="darkBlue"
      />
      <RowItem
        label="Hoa hồng còn lại"
        value={`${convertCurrency(item?.commission_after)} VNĐ`}
      />
    </Block>
  );
};

export default ItemPoint;

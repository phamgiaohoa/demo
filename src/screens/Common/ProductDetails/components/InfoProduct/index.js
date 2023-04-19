import {Block, Text} from '@components';
import {convertCurrency} from '@utils/helper';
import React from 'react';
import Rating from '@components/Common/Rating';

const InfoProduct = ({data}) => {
  return (
    <Block padding={12} marginBottom={8} backgroundColor="white">
      <Text size={16} marginBottom={10} fontType="semibold">
        {data?.title}
      </Text>
      <Rating imageSize={18} startingValue={data?.rating?.average || 0} />
      <Block row alignCenter marginTop={10}>
        <Text size={24} color="red" fontType="bold">
          {data?.price_buy === '0'
            ? 'Liên hệ'
            : convertCurrency(data?.price_buy) + ' đ'}
        </Text>
        {Number(data?.percent_discount) > 0 && (
          <Block row alignCenter>
            <Text
              color="lightGray"
              fontType="light"
              marginHorizontal={10}
              textDecorationLine="line-through">
              {convertCurrency(data?.price)}đ
            </Text>
            <Text fontType="semibold">
              -{Math.ceil(data?.percent_discount)}%
            </Text>
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default InfoProduct;

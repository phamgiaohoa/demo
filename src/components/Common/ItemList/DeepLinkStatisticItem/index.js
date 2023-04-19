import {Block, Text} from '@components';
import {convertCurrency} from '@utils/helper';
import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

const DeepLinkStatisticItem = ({
  customer_picture,
  customer_name,
  customer_phone,
  date_create,
  order_code,
  product_name,
  deeplink_total,
}) => {
  return (
    <Block
      flex
      radius={5}
      padding={16}
      marginTop={12}
      marginHorizontal={12}
      backgroundColor="white">
      <Block row alignCenter marginBottom={12}>
        <Image source={{uri: customer_picture}} style={styles.avatar} />
        <Block flex>
          <Block row alignCenter space="between">
            <Text fontType="semibold">{customer_name}</Text>
            <Text size={11} fontType="light">
              {date_create}
            </Text>
          </Block>
          <Text size={14} fontType="light">
            {customer_phone}
          </Text>
        </Block>
      </Block>
      <Block row marginBottom={5}>
        <Text fontType="light" style={styles.leftSide}>
          Mã đơn hàng:
        </Text>
        <Text color="blue">#{order_code}</Text>
      </Block>
      <Block row marginBottom={5}>
        <Text fontType="light" style={styles.leftSide}>
          Tên sản phẩm:
        </Text>
        <Text flexShrink>{product_name}</Text>
      </Block>
      <Block row>
        <Text fontType="light" style={styles.leftSide}>
          Hoa hồng:
        </Text>
        <Text flexShrink color="green">
          {convertCurrency(deeplink_total)} đ
        </Text>
      </Block>
    </Block>
  );
};

export default DeepLinkStatisticItem;

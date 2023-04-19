import {Block, Text} from '@components';
import actions from '@redux/actions';
import {convertCurrency} from '@utils/helper';
import moment from 'moment';
import React from 'react';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ItemOrder = ({item}) => {
  const dispatch = useDispatch();
  const config = useSelector(state => state.config?.data);
  const user = useSelector(state => state.tokenUser.data);

  const _onPress = () => {
    dispatch({
      type: actions.GET_ORDER_DETAILS,
      params: {
        is_status: item.is_status,
        order_id: item.order_id,
        user,
      },
    });
  };

  return (
    <Pressable onPress={_onPress}>
      <Block paddingVertical={12} radius={8} backgroundColor="white">
        <Block row alignCenter paddingHorizontal={16} space="between">
          <Text>{item.o_full_name}</Text>
          <Text size={13} color="gray">
            {moment(item.date_create * 1000).format('DD/MM/YYYY')}
          </Text>
        </Block>
        <Block
          row
          alignCenter
          marginVertical={12}
          paddingHorizontal={16}
          space="between">
          <Text fontType="bold">#{item.order_code}</Text>
          <Block row alignCenter>
            <Text
              size={16}
              fontType="bold"
              color={config?.general_active_color}>
              {convertCurrency(item.total_payment)} đ
            </Text>
          </Block>
        </Block>
        <Block
          row
          alignCenter
          paddingHorizontal={16}
          paddingTop={12}
          space="between"
          style={styles.border}>
          <Text color={item.is_status_color}>{item.is_status_title}</Text>
          <Text fontType="bold">{item.o_phone}</Text>
        </Block>
      </Block>
    </Pressable>
  );
};

export default ItemOrder;

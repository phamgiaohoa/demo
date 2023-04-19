/* eslint-disable react-native/no-inline-styles */
import {icons} from '@assets';
import {AnimatedImage, Block, Text} from '@components';
import Rating from '@components/Common/Rating';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import actions from '@redux/actions';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const HorizontalProductItem = ({
  thumbnail,
  image,
  is_new,
  salePercent,
  price,
  priceBuy,
  title = '',
  rate,
  item_id = '',
  is_combo,
  type,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.tokenUser.data);

  const _onPress = () =>
    navigation.navigate(routes.PRODUCT_DETAIL, {
      title,
      item_id,
      hasCombo: is_combo && (type === 'LATER' ? false : true),
    });

  const _removeItem = () => {
    type === 'LIKED'
      ? dispatch({
          type: actions.CHECK_FAVORITE,
          body: {
            item_id,
            type: 'product',
          },
          params: {
            user,
          },
          isGetData: true,
        })
      : dispatch({
          type: actions.CHECK_BUY_LATER,
          user,
          body: {
            act: 'del',
            item_id,
          },
          params: {
            user,
          },
        });
  };

  return (
    <Block
      radius={5}
      marginHorizontal={12}
      marginBottom={12}
      backgroundColor="white">
      <Pressable style={styles.pressablestyle} onPress={_onPress}>
        <AnimatedImage
          thumbnail={thumbnail}
          source={image}
          style={styles.image}
        />
        <Block flex padding={8}>
          <Text numberOfLines={2}>{title}</Text>
          <Text marginTop={5} size={16} color="red" fontType="semibold">
            {priceBuy} đ
          </Text>
          {salePercent !== '0' && (
            <Block row alignCenter>
              <Text
                size={12}
                fontType="light"
                color="lightGray"
                style={{
                  textDecorationLine: 'line-through',
                }}>
                {price} đ
              </Text>
              <Text size={12} color="red" marginVertical={5}>
                {' '}
                -{Math.round(salePercent)}%
              </Text>
            </Block>
          )}
          <Block row alignCenter space="between">
            <Rating imageSize={12} startingValue={rate} />
            {is_new === '1' && (
              <Image
                resizeMode="cover"
                source={icons.new}
                style={styles.icoNew}
              />
            )}
          </Block>
        </Block>
        {type === 'LATER' || type === 'LIKED' ? (
          <Pressable style={styles.closeWrap} onPress={_removeItem}>
            <Image
              style={styles.close}
              source={icons.close}
              resizeMode="contain"
            />
          </Pressable>
        ) : null}
      </Pressable>
    </Block>
  );
};

export default HorizontalProductItem;

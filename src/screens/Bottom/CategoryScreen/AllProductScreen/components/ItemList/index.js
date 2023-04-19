/* eslint-disable react-native/no-inline-styles */
import {icons} from '@assets';
import {AnimatedImage, Block, Text} from '@components';
import Rating from '@components/Common/Rating';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const ItemList = ({
  thumbnail,
  image,
  salePercent,
  price,
  priceBuy,
  title = '',
  rate,
  is_new,
  style,
  item_id = '',
}) => {
  const navigation = useNavigation();

  const _onPress = () =>
    navigation.navigate(routes.PRODUCT_DETAIL, {
      item_id,
    });

  return (
    <Pressable style={styles.container} onPress={_onPress}>
      <AnimatedImage
        thumbnail={thumbnail}
        source={image}
        style={styles.image}
      />
      <Block flex marginLeft={15} space="around">
        <Text size={13} numberOfLines={2}>
          {title}
        </Text>
        <Text marginTop={5} size={15} color="red" fontType="semibold">
          {priceBuy} đ
        </Text>
        {salePercent !== '0' && (
          <Block row alignCenter marginTop={5}>
            <Block
              marginRight={6}
              paddingHorizontal={5}
              borderRadius={2}
              backgroundColor="red">
              <Text size={11} marginVertical={3} color="white" fontType="bold">
                {Math.ceil(salePercent)}%
              </Text>
            </Block>
            <Text
              size={12}
              fontType="light"
              color="lightGray"
              style={{
                textDecorationLine: 'line-through',
              }}>
              {price} đ
            </Text>
          </Block>
        )}
        <Block row alignCenter marginTop={5} space="between">
          <Rating imageSize={12} startingValue={rate} />
          {is_new === '1' && (
            <Image
              source={icons.new}
              resizeMode="contain"
              style={styles.icoNew}
            />
          )}
        </Block>
      </Block>
    </Pressable>
  );
};

export default ItemList;

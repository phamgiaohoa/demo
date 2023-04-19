import {AnimatedImage, Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import {convertCurrency} from '@utils/helper';
import {width} from '@utils/responsive';
import React from 'react';
import {Pressable} from 'react-native';
import styles from './styles';

const ItemSearch = ({item}) => {
  const navigation = useNavigation();

  const _onPress = () => {
    navigation.navigate(routes.PRODUCT_DETAIL, {
      title: item.title,
      item_id: item.item_id,
    });
  };

  return (
    <Block>
      <Pressable style={styles.button} onPress={_onPress}>
        <AnimatedImage
          style={styles.image}
          thumbnail={item.thumbnail}
          source={item.picture}
        />
        <Block width={width * 0.8}>
          <Text size={12} numberOfLines={1}>
            {item.title}
          </Text>
          <Text size={12} marginTop={5}>
            {convertCurrency(item.price)} VNĐ
          </Text>
        </Block>
      </Pressable>

      <Block height={2} backgroundColor="smoke" />
    </Block>
  );
};

export default ItemSearch;

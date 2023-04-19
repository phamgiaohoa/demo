import {icons} from '@assets';
import {AnimatedImage, Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import React from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import styles from './styles';

const ProductCombo = ({data = []}) => {
  const navigation = useNavigation();

  const _onShowAll = () => {
    navigation.navigate(routes.LIST_PRODUCT_HOME, {
      title: 'Combo ưu đãi',
    });
  };

  const _keyExtractor = (_, index) => String(index);

  const _renderSeparator = () => <Block width={12} />;

  const _renderItem = ({item}) => {
    const _onMoveDetails = () => {
      navigation.navigate(routes.PRODUCT_DETAIL, {
        item_id: item?.item_id,
        hasCombo: true,
      });
    };

    return (
      <Pressable onPress={_onMoveDetails}>
        <Block
          flex
          radius={10}
          width={getSize.s(270)}
          backgroundColor="white"
          overflow="hidden">
          <AnimatedImage
            style={styles.itemProduct}
            thumbnail={item?.thumbnail}
            source={item?.picture}
          />
          <Block flex padding={10} space="between">
            <Text fontType="bold" numberOfLines={2}>
              {item?.title}
            </Text>
            <Text fontType="bold" color="darkRed" numberOfLines={1}>
              {convertCurrency(item?.price_buy)} đ{' '}
              <Text size={12} color="gray2" textDecorationLine="line-through">
                {convertCurrency(item?.price)} đ
              </Text>
            </Text>
          </Block>
        </Block>
      </Pressable>
    );
  };

  return data?.length ? (
    <Block marginVertical={12} paddingHorizontal={12}>
      <Block marginBottom={12} row alignCenter space="between">
        <Block row alignCenter>
          <Text size={16} fontType="bold" color="darkRed">
            Combo ưu đãi
          </Text>
          <Image
            style={styles.iconPer}
            source={icons.percentage}
            resizeMode="contain"
          />
        </Block>
        <Pressable onPress={_onShowAll}>
          <Text size={12} color="gray2">
            Xem tất cả
          </Text>
        </Pressable>
      </Block>
      <FlatList
        horizontal
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        ItemSeparatorComponent={_renderSeparator}
        showsHorizontalScrollIndicator={false}
      />
    </Block>
  ) : null;
};

export default ProductCombo;

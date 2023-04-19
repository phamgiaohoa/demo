import {Block, Text} from '@components';
import ProductItem from '@components/Common/ItemList/ProductItem';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import React, {useState} from 'react';
import {FlatList, Pressable} from 'react-native';
import {convertProductAll} from '../../helper';

const ProductGroup = ({productBy, rest}) => {
  const {navigate} = useNavigation();
  const [groupSelect, setGroupSelect] = useState(null);

  const dataAll = convertProductAll(productBy?.group_child);

  const _onShowAll = () => {
    navigate(routes.ALL_PRODUCT_SCREEN, {
      title: productBy?.title,
      group_id: productBy?.group_id,
    });
  };

  const _keyCategory = (_, index) => String(index);

  const _keyProduct = item => item.item_id;

  const _renderSeparatorCategory = () => {
    return <Block width={12} />;
  };

  const _renderCategory = ({item}) => {
    const isActive = groupSelect?.group_id === item?.group_id;

    const _onSelect = () => {
      setGroupSelect(isActive ? null : item);
    };

    return (
      <Pressable onPress={_onSelect}>
        <Block
          paddingVertical={5}
          paddingHorizontal={15}
          radius={50}
          borderWidth={0.5}
          backgroundColor={isActive ? 'lightBlue' : 'white'}
          borderColor="smoke">
          <Text size={13} color={isActive ? 'white' : 'black'}>
            {item?.title}
          </Text>
        </Block>
      </Pressable>
    );
  };

  const _renderProduct = ({item}) => (
    <ProductItem
      style={{width: getSize.s(133)}}
      imageStyle={{height: getSize.s(115)}}
      marginBottom={0}
      thumbnail={item.thumbnail}
      image={item.picture}
      title={item.title}
      priceBuy={convertCurrency(item.price_buy)}
      price={convertCurrency(item.price)}
      salePercent={item.percent_discount}
      rate={item?.rating || 0}
      is_new={item.is_new}
      item_id={item.item_id}
    />
  );

  if (!productBy?.group_child?.length) {
    return null;
  }

  return (
    <Block marginVertical={12} {...rest}>
      <Block row alignCenter marginRight={12} space="between">
        <Block paddingLeft={9} borderLeftWidth={5} borderColor="darkBlue">
          <Text size={16} fontType="bold" color="darkBlue">
            {productBy?.title}
          </Text>
        </Block>
        <Pressable onPress={_onShowAll}>
          <Text size={12} color="gray2">
            Xem tất cả
          </Text>
        </Pressable>
      </Block>
      <Block margin={12}>
        <FlatList
          horizontal
          data={productBy?.group_child}
          keyExtractor={_keyCategory}
          renderItem={_renderCategory}
          ItemSeparatorComponent={_renderSeparatorCategory}
          showsHorizontalScrollIndicator={false}
        />
      </Block>
      <Block marginHorizontal={12}>
        <FlatList
          horizontal
          data={groupSelect?.data || dataAll}
          keyExtractor={_keyProduct}
          renderItem={_renderProduct}
          showsHorizontalScrollIndicator={false}
        />
      </Block>
    </Block>
  );
};

export default ProductGroup;

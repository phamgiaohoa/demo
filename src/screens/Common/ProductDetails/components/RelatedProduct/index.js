import {Block, Text} from '@components';
import ProductItem from '@components/Common/ItemList/ProductItem';
import {convertCurrency} from '@utils/helper';
import I18n from 'i18n';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const RelatedProduct = React.memo(({data}) => {
  const _renderItem = item => (
    <ProductItem
      key={item.item_id}
      thumbnail={item.thumbnail}
      image={item.picture}
      title={item.title}
      priceBuy={convertCurrency(item.price_buy)}
      price={convertCurrency(item.price)}
      salePercent={item.percent_discount}
      rate={item.rating}
      is_new={item.is_new}
      item_id={item.item_id}
    />
  );

  if (!data?.length) {
    return null;
  }

  return (
    <Block flex padding={7}>
      <Text
        size={16}
        marginVertical={10}
        marginHorizontal={5}
        fontType="semibold">
        {I18n.t('productDetails.similarProducts')}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Block row>{data?.map(_renderItem)}</Block>
      </ScrollView>
    </Block>
  );
});

export default RelatedProduct;

import {Block, Icon, Text} from '@components';
import ProductItem from '@components/Common/ItemList/ProductItem';
import {convertCurrency} from '@utils/helper';
import {getSize, width} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {ScrollView} from 'react-native';

const ComboProduct = ({data}) => {
  const _renderItem = item => {
    return (
      <ProductItem
        key={item.item_id}
        title={item.title}
        image={item.picture}
        thumbnail={item.thumbnail}
        price={convertCurrency(item.price)}
        salePercent={item.percent_discount}
        priceBuy={convertCurrency(item.price_buy)}
        rate={item.rating}
        is_new={item.is_new}
        item_id={item.item_id}
        borderWidth={0.5}
        borderColor="smoke"
        style={{width: width / 3.6}}
        imageStyle={{height: getSize.s(70)}}
        isRate={false}
        isPriceBuy={false}
        disabled
      />
    );
  };

  if (!data) {
    return null;
  }

  return (
    <Block padding={12} marginBottom={10} backgroundColor="white">
      <Text size={16} fontType="semibold" marginBottom={10}>
        {I18n.t('productDetails.comboInclude')}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {_renderItem(data)}
        <Block justifyCenter marginHorizontal={8}>
          <Icon size={15} type="AntDesign" name="plus" />
        </Block>
        {data?.arr_detail_combo?.map(_renderItem)}
      </ScrollView>
    </Block>
  );
};

export default ComboProduct;

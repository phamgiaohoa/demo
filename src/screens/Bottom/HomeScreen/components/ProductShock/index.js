import {icons} from '@assets';
import {Block, Text} from '@components';
import ProductItem from '@components/Common/ItemList/ProductItem';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import styles from './styles';

const ProductShock = ({shocks = []}) => {
  const navigation = useNavigation();
  const [shockSelect, setShockSelect] = useState(null);

  useEffect(() => {
    if (shocks?.length) {
      setShockSelect(shocks[0]);
    }
  }, [shocks]);

  const _onShowAll = () => {
    navigation.navigate(routes.ALL_PRODUCT_SCREEN, {
      title: 'Giá sốc',
      group_id: shockSelect?.group_id,
    });
  };

  const _keyCategory = (_, index) => String(index);

  const _keyProduct = item => item.item_id;

  const _renderSeparatorCategory = () => {
    return <Block width={12} />;
  };

  const _renderCategory = ({item}) => {
    const isActive = shockSelect?.group_id === item?.group_id;

    const _onSelect = () => {
      if (!isActive) {
        setShockSelect(item);
      }
    };

    return (
      <Pressable onPress={_onSelect}>
        <Block
          paddingVertical={5}
          paddingHorizontal={15}
          radius={50}
          borderWidth={0.5}
          backgroundColor={isActive ? 'darkBlue' : 'white'}
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

  return shocks?.length ? (
    <Block marginVertical={12} paddingHorizontal={12}>
      <Block row alignCenter space="between">
        <Block row alignCenter>
          <Image
            style={styles.txtPrice}
            source={icons.txt_price}
            resizeMode="contain"
          />
          <Image
            style={styles.iconFlash}
            source={icons.flash}
            resizeMode="contain"
          />
        </Block>
        <Pressable onPress={_onShowAll}>
          <Text size={12} color="gray2">
            Xem tất cả
          </Text>
        </Pressable>
      </Block>
      <Block marginVertical={12}>
        <FlatList
          horizontal
          data={shocks}
          keyExtractor={_keyCategory}
          renderItem={_renderCategory}
          ItemSeparatorComponent={_renderSeparatorCategory}
          showsHorizontalScrollIndicator={false}
        />
      </Block>
      <FlatList
        horizontal
        data={shockSelect?.data || []}
        keyExtractor={_keyProduct}
        renderItem={_renderProduct}
        showsHorizontalScrollIndicator={false}
      />
    </Block>
  ) : null;
};

export default ProductShock;

import {icons} from '@assets';
import {AnimatedImage, Block, Text} from '@components';
import {theme} from '@theme';
import {convertCurrency, convertOption} from '@utils/helper';
import I18n from 'i18n';
import React from 'react';
import {Image, Pressable, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {ADD_CART} from '../../helper';
import Options from '../Options';
import styles from './styles';

const ContentTypeProduct = ({
  hasCombo,
  typPress,
  useQuantity,
  useOptions,
  onUpdateCart,
}) => {
  const {
    thumbnail,
    picture,
    price,
    price_buy,
    percent_discount,
    arr_option_tmp,
  } =
    useSelector(state => {
      return hasCombo
        ? state.comboProductDetails.data
        : state.productDetails.data;
    }) || {};
  const config = useSelector(state => state.config.data);
  const [quantity, setQuantity] = useQuantity;
  const [options, setOptions] = useOptions;

  const option = convertOption(
    arr_option_tmp,
    options[0],
    options[1],
    options[2],
  );

  const _renderConfirm = () => {
    const isQuantity =
      option?.useWarehouse === 1 && Number(quantity) > option?.Quantity;
    const disabled = !option || !option?.Quantity || isQuantity;

    return (
      <Block>
        {isQuantity && (
          <Block paddingTop={12} backgroundColor="white">
            <Text center color="red">
              {option?.Quantity === 0
                ? 'Hiện tại đã hết hàng'
                : `Số lượng hiện tại ${option?.Quantity}`}
            </Text>
          </Block>
        )}
        <Block
          row
          paddingHorizontal={12}
          paddingTop={12}
          paddingBottom={30}
          backgroundColor="white">
          <Pressable
            disabled={disabled}
            onPress={() => onUpdateCart(typPress, option)}
            style={{
              ...styles.btnFoot,
              backgroundColor: !disabled
                ? config.general_active_color
                : theme.colors.smoke,
            }}>
            <Text color={!disabled ? 'white' : 'lightGray'}>
              {typPress === ADD_CART
                ? I18n.t('typeProduct.addCart')
                : I18n.t('typeProduct.buy')}
            </Text>
          </Pressable>
        </Block>
      </Block>
    );
  };

  return (
    <Block style={styles.content}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Block row alignCenter>
          <AnimatedImage
            thumbnail={option?.Picture || thumbnail}
            source={option?.Picture || picture}
            style={styles.image}
          />
          <Block flex justifyCenter paddingLeft={10}>
            <Text size={21} color={theme.colors.red} fontType="bold">
              {convertCurrency(option?.PriceBuy || price_buy)} đ {'    '}
              <Text size={14} color={theme.colors.red}>
                -{Math.ceil(option?.PercentDiscount || percent_discount)}%
              </Text>
            </Text>
            <Text size={12} color={theme.colors.placeholder}>
              {convertCurrency(option?.Price || price)} đ
            </Text>
            <Block row alignCenter marginTop={5}>
              <Pressable
                style={styles.buttonCount}
                onPress={() => quantity > 1 && setQuantity(prev => --prev)}>
                <Image
                  style={styles.minus}
                  source={icons.minus}
                  resizeMode="contain"
                />
              </Pressable>
              <Block style={{...styles.buttonCount, ...styles.count}}>
                <Text>{quantity}</Text>
              </Block>
              <Pressable
                style={styles.buttonCount}
                onPress={() => setQuantity(prev => ++prev)}>
                <Image
                  style={styles.plus}
                  source={icons.plus}
                  resizeMode="contain"
                />
              </Pressable>
            </Block>
          </Block>
        </Block>
        <Options
          hasCombo={hasCombo}
          options={options}
          setOptions={setOptions}
        />
      </ScrollView>
      {_renderConfirm()}
    </Block>
  );
};

export default ContentTypeProduct;

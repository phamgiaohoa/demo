import {icons} from '@assets';
import {AnimatedImage, Block, Text} from '@components';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {Image, Pressable, ScrollView} from 'react-native';
import styles from './styles';

const SelectDelivery = ({
  data = [],
  disable,
  orderShip,
  onSelect,
  check,
  ...props
}) => {
  const _renderBonus = item => {
    if (!item?.gift_info?.length && !item?.include_info?.length) {
      return null;
    }

    const isGift = item.gift_info?.length > 0;
    const arrBonus = isGift ? item.gift_info : item.include_info;

    return (
      <Block marginTop={8}>
        <Text fontType="semibold">
          {isGift ? I18n.t('cart.giftProduct') : I18n.t('cart.chooseBonus')}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {arrBonus?.map((bonus, index) => {
            const marginLeft = index !== 0 ? 12 : 0;
            return (
              <Block
                key={index}
                marginLeft={marginLeft}
                padding={8}
                radius={5}
                marginTop={8}
                width={85}
                borderWidth={2}
                borderColor="background">
                <Block alignCenter>
                  <Image
                    style={{
                      width: getSize.s(45),
                      height: getSize.s(45),
                      borderRadius: getSize.s(5),
                    }}
                    source={{uri: bonus?.picture}}
                    resizeMode="contain"
                  />
                </Block>
                <Text marginTop={5} size={13} numberOfLines={2}>
                  {bonus?.title}
                </Text>
                {!isGift && (
                  <Text size={11} numberOfLines={1} color="red">
                    {convertCurrency(bonus?.price_buy)} đ
                  </Text>
                )}
              </Block>
            );
          })}
        </ScrollView>
      </Block>
    );
  };

  const _renderItem = (item, index) => {
    return (
      <Block
        key={index}
        row
        marginVertical={10}
        borderWidth={0.5}
        radius={5}
        padding={10}
        marginTop={10}
        borderColor={theme.colors.lightGray}>
        <AnimatedImage
          thumbnail={item.thumbnail}
          source={item.picture}
          style={styles.image}
        />
        <Block flex paddingLeft={10}>
          <Text color={theme.colors.placeholder}>{item.title}</Text>
          <Block row space="between" marginTop={5}>
            <Text fontType="bold">SL: x {item.quantity}</Text>
            <Text fontType="bold">
              {convertCurrency(item.price_buy)}{' '}
              <Text style={styles.underline}>đ</Text>
            </Text>
          </Block>
          {_renderBonus(item)}
        </Block>
      </Block>
    );
  };

  return (
    <Block {...props} backgroundColor="white" padding={12}>
      <Block row space="between" marginBottom={5}>
        <Text fontType="bold">{I18n.t('cart.choose')}</Text>
        {check ? (
          <Pressable disabled={disable} onPress={onSelect}>
            <Text color={theme.colors.red}>{I18n.t('cart.change')}</Text>
          </Pressable>
        ) : null}
      </Block>
      <Block style={styles.btnSelect}>
        <Image
          style={styles.check}
          source={icons.checkCircle}
          resizeMode="contain"
        />
        <Text>{orderShip?.title}</Text>
      </Block>
      <Text fontType="bold">{I18n.t('cart.orderOnce')}</Text>
      {data?.map(_renderItem)}
    </Block>
  );
};

export default SelectDelivery;

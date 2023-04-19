/* eslint-disable react-hooks/rules-of-hooks */
import {icons} from '@assets';
import {Block, Text} from '@components';
import {useNavigation} from '@react-navigation/core';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import {height} from '@utils/responsive';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDispatchApplyCombo,
  useActiveBonus,
  useAddBonus,
  useComboInfo,
} from './../../helper';
import styles from './styles';

const ContentGift = ({data, isGift}) => {
  const {
    item_id,
    quantity,
    option_id,
    arr_gift,
    arr_include,
    num_chose,
    include_info,
    gift_info,
  } = data || {};

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [itemBonus, setItemBonus] = useState(null);
  const cart = useSelector(state => state.cart.data);
  const user = useSelector(state => state.tokenUser.data);

  useEffect(() => {
    include_info?.length && setItemBonus(include_info);
    gift_info?.length && setItemBonus(gift_info);
  }, [gift_info, include_info]);

  const _onApply = () => {
    if (itemBonus) {
      const combo_info = useComboInfo(itemBonus, isGift);
      dispatch(
        getDispatchApplyCombo({
          user,
          item_id,
          quantity,
          option_id,
          combo_info,
          cart,
          itemBonus,
        }),
      );
      navigation.goBack();
    }
  };

  const _keyExtractor = (_, index) => `ContentGift-${index}`;

  const _renderItem = ({item}) => {
    const opacity = item.active === '0' ? 0.5 : 1;
    const isActive = useActiveBonus(itemBonus, item);

    const _onSelectItem = () => {
      const bonus = useAddBonus(itemBonus, item, isActive, num_chose);
      setItemBonus(bonus);
    };

    return (
      <Pressable
        disabled={item.active === '0'}
        onPress={_onSelectItem}
        style={styles.itemWrap(opacity)}>
        <Image
          style={{
            ...styles.iconCheck,
            tintColor: isActive ? theme.colors.red : theme.colors.placeholder,
          }}
          source={isActive ? icons.dot_circle : icons.circle}
        />
        <Block flex row space="between">
          <Block flex row>
            <Image style={styles.picture} source={{uri: item.picture}} />
            <Block flex space="between">
              <Text numberOfLines={1}>{item.title}</Text>
              <Text
                color="placeholder"
                textDecorationLine={isGift ? 'line-through' : 'none'}>
                {convertCurrency(item.price_buy)}đ
              </Text>
            </Block>
          </Block>
          {isGift && (
            <Pressable style={styles.giftWrap}>
              <Text size={12} color="red">
                Quà tặng
              </Text>
            </Pressable>
          )}
        </Block>
      </Pressable>
    );
  };

  return (
    <Block radius={5} padding={12} backgroundColor="white">
      <Block row alignCenter space="between">
        <Text fontType="heavy">
          {isGift ? 'QUÀ TẶNG CỦA BẠN' : 'SẢN PHẨM MUA KÈM'}
        </Text>
        <Text fontType="heavy">
          {itemBonus?.length || 0}/{num_chose}
        </Text>
      </Block>
      {isGift && (
        <Block padding={8} radius={5} marginTop={12} backgroundColor="smoke">
          <Text>Vui lòng chọn quà tặng</Text>
        </Block>
      )}
      <Block marginTop={15} maxHeight={height / 2}>
        <FlatList
          data={isGift ? arr_gift : arr_include}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
          ItemSeparatorComponent={() => <Block height={20} />}
        />
      </Block>
      <Block row alignCenter marginTop={20} space="between">
        <Block />
        <Pressable onPress={_onApply} style={styles.btnConfirmGift}>
          <Text color="white">Hoàn tất</Text>
        </Pressable>
      </Block>
    </Block>
  );
};

export default ContentGift;

import {icons} from '@assets';
import {AnimatedImage, Block, Text} from '@components';
import actions, {_onSuccess} from '@redux/actions';
import {theme} from '@theme';
import {convertCurrency, CustomToast} from '@utils/helper';
import I18n from 'i18n';
import React, {useState} from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ChooseGift from '../ChooseGift';
import styles from './styles';

const ListCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.data);
  const user = useSelector(state => state.tokenUser.data);
  const isLoading = useSelector(state => state.updateCart.isLoading);
  const [refreshing, setRefreshing] = useState(false);

  const _onBuyLater = ({item_id, option_id}) => {
    if (user) {
      dispatch({
        type: actions.CHECK_BUY_LATER,
        body: {
          act: 'add',
          item_id,
          option_id,
        },
        params: {
          user,
        },
      });
      _onClose({item_id, option_id});
      CustomToast(I18n.t('cart.toastbuy'));
    }
  };

  const _onClose = ({item_id, option_id}) => {
    if (user) {
      dispatch({
        type: actions.UPDATE_CART,
        params: {user},
        body: {
          item_id,
          option_id,
          quantity: 0,
        },
      });
    } else {
      dispatch({
        type: _onSuccess(actions.GET_CART),
        data: cart?.filter(value => value?.option_id !== option_id),
      });
    }
  };

  const _onMinus = ({item_id, quantity, option_id, combo_info}) => {
    if (Number(quantity) > 1) {
      if (user) {
        dispatch({
          type: actions.UPDATE_CART,
          params: {user},
          body: {
            item_id,
            option_id,
            quantity: Number(quantity) - 1,
            combo_info: JSON.stringify(combo_info),
          },
        });
      } else {
        dispatch({
          type: _onSuccess(actions.GET_CART),
          data: cart?.map(value => ({
            ...value,
            quantity:
              value?.option_id === option_id
                ? Number(quantity) - 1
                : value?.quantity,
          })),
        });
      }
    }
  };

  const _onPlus = ({item_id, quantity, option_id, combo_info}) => {
    if (user) {
      dispatch({
        type: actions.UPDATE_CART,
        params: {user},
        body: {
          item_id,
          option_id,
          quantity: Number(quantity) + 1,
          combo_info: JSON.stringify(combo_info),
        },
      });
    } else {
      dispatch({
        type: _onSuccess(actions.GET_CART),
        data: cart?.map(value => ({
          ...value,
          quantity:
            value?.option_id === option_id
              ? Number(quantity) + 1
              : value?.quantity,
        })),
      });
    }
  };

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    dispatch({
      type: actions.GET_CART,
      params: {
        user,
      },
    });
  };

  const _keyExtractor = (_, index) => String(index);

  const _renderItem = ({item, index}) => {
    const isGif = item.is_combo === 1;

    return (
      <Block row radius={5} padding={12} backgroundColor="white">
        <AnimatedImage
          style={styles.image}
          source={item.picture}
          thumbnail={item.thumbnail}
        />
        <Block flex paddingLeft={10} space="between">
          <Pressable
            disabled={isLoading}
            style={styles.closeWrap}
            onPress={() => _onClose(item)}>
            <Image
              style={styles.close}
              source={icons.close}
              resizeMode="contain"
            />
          </Pressable>
          <Block marginRight={16}>
            <Text numberOfLines={2} fontType="semibold">
              {item.title}
            </Text>
          </Block>
          {!!item?.option_text && (
            <Text size={13} fontType="light" marginTop={8}>
              {item.option_text}
            </Text>
          )}
          <Block row alignCenter marginTop={8}>
            <Text fontType="bold" color={theme.colors.red}>
              {convertCurrency(item.price_buy)}đ{' '}
              <Text
                size={13}
                fontType="light"
                style={styles.textLine}
                color={theme.colors.placeholder}>
                {convertCurrency(item.price)}đ
              </Text>
              <Text color={theme.colors.red} numberOfLines={1}>
                {' '}
                -{Math.ceil(item.percent_discount)}%
              </Text>
            </Text>
          </Block>
          <Block row alignCenter space="between" marginTop={8}>
            <Block row alignCenter>
              <Pressable
                disabled={isLoading}
                style={styles.buttonCount}
                onPress={() => _onMinus(item)}>
                <Image
                  style={styles.minus}
                  source={icons.minus}
                  resizeMode="contain"
                />
              </Pressable>
              <Block style={styles.buttonCount}>
                <Text>{item.quantity}</Text>
              </Block>
              <Pressable
                disabled={isLoading}
                style={styles.buttonCount}
                onPress={() => _onPlus(item)}>
                <Image
                  style={styles.plus}
                  source={icons.plus}
                  resizeMode="contain"
                />
              </Pressable>
            </Block>
            {!isGif && (
              <Pressable disabled={isLoading} onPress={() => _onBuyLater(item)}>
                <Text size={13} color="blue">
                  {I18n.t('cart.buylater')}
                </Text>
              </Pressable>
            )}
          </Block>
          {isGif && <ChooseGift item={item} />}
        </Block>
      </Block>
    );
  };

  return (
    <FlatList
      data={cart}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      refreshing={refreshing}
      onRefresh={user ? _onRefresh : null}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <Block height={12} />}
    />
  );
};

export default ListCart;

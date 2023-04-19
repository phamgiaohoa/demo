import {icons} from '@assets';
import {Block, FormContainer, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import actions from '@redux/actions';
import {theme} from '@theme';
import {convertCart, CustomToast} from '@utils/helper';
import I18n from 'i18n';
import React, {useEffect, useRef} from 'react';
import {Image, Pressable, TextInput} from 'react-native';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const FormVoucher = ({usePromotion}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const inputRef = useRef();
  const cart = useSelector(state => state.cart.data);
  const user = useSelector(state => state.tokenUser.data);
  const config = useSelector(state => state.config.data);
  const {isLoading} = useSelector(state => state.usePromotion);
  const [promotionCode, setPromotionCode] = usePromotion;

  useEffect(() => {
    user &&
      dispatch({
        type: actions.GET_DISCOUNT,
        params: {
          user,
          p: 1,
        },
      });
  }, [dispatch, user]);

  const onSetPromotionCode = value => setPromotionCode(value);

  const _onApply = () => {
    if (!promotionCode) {
      return CustomToast('Bạn chưa nhập mã khuyến mãi');
    }

    dispatch({
      type: actions.USE_PROMOTION,
      params: {
        user,
      },
      body: {
        code: promotionCode,
        cart: convertCart(cart),
      },
    });
  };

  return (
    <Block backgroundColor="white" padding={12} marginBottom={12}>
      <Block row alignCenter>
        <Text>{I18n.t('cart.voucherSaved')}</Text>
        <Pressable
          style={styles.btnSee}
          onPress={() => {
            navigation.navigate(routes.DISCOUNT_MANAGEMENT, {
              type: 'payment',
              onSetPromotionCode,
            });
          }}>
          <Text color={theme.colors.red}> {I18n.t('cart.seeHere')}</Text>
        </Pressable>
        <Menu>
          <MenuTrigger>
            <Image style={styles.iconInfo} source={icons.question} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.optionStyle}>
            <Block
              flex
              padding={12}
              radius={5}
              backgroundColor={theme.colors.placeholder}>
              <Text color="white">{I18n.t('cart.infoCoupon')}</Text>
            </Block>
          </MenuOptions>
        </Menu>
      </Block>
      <FormContainer>
        <Block row>
          <Pressable
            onPress={() => inputRef.current.focus()}
            style={{
              ...styles.inputWrap,
              borderColor: config.general_active_color,
            }}>
            <Image style={styles.iconCoupon} source={icons.coupon} />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholderTextColor={theme.colors.placeholder}
              placeholder={I18n.t('cart.coupon')}
              value={promotionCode}
              onChangeText={text => setPromotionCode(text)}
            />
          </Pressable>
          <Pressable
            disabled={isLoading}
            onPress={_onApply}
            style={{
              ...styles.btnApply,
              backgroundColor: config.general_active_color,
            }}>
            <Text color="white">{I18n.t('cart.apply')}</Text>
          </Pressable>
        </Block>
      </FormContainer>
    </Block>
  );
};

export default FormVoucher;

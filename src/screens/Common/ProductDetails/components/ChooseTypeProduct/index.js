/* eslint-disable react-hooks/rules-of-hooks */
import {icons} from '@assets';
import {Block, Loading, ModalBox, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation, useRoute} from '@react-navigation/core';
import actions, {_onSuccess} from '@redux/actions';
import {convertOption, CustomToast} from '@utils/helper';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addCartToLocal, ADD_CART, BUY_NOW, useComboInfo} from '../../helper';
import AddComment from '../AddComment';
import ContentTypeProduct from '../ContentTypeProduct';
import styles from './styles';

const ChooseTypeProduct = ({
  productBonus,
  hasCombo,
  isComBoGift,
  onSetAnimated,
}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const [productQty, setProductQty] = useState(1);
  const [options, setOptions] = useState(['', '', '']);
  const [typePress, setTypePress] = useState(ADD_CART);
  const [isVisible, setIsVisible] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const cart = useSelector(state => state.cart.data);
  const config = useSelector(state => state.config.data);
  const user = useSelector(state => state.tokenUser.data);
  const productDetails = useSelector(state => state.productDetails.data);
  const comboDetails = useSelector(state => state.comboProductDetails.data);
  const isProductOption = useSelector(state => state.productOptions.isLoading);

  const data = hasCombo ? comboDetails : productDetails;

  const {arr_option, arr_option_tmp, item_id} = data || {};

  const arrOption1 = arr_option?.[0] && Object.keys(arr_option?.[0].value);

  useEffect(() => {
    dispatch({
      type: actions.GET_PRODUCT_OPTION,
      params: {
        item_id: route.params?.item_id,
        option1: options[0],
        option2: options[1],
        option3: options[2],
      },
    });
  }, [dispatch, route.params?.item_id, options]);

  const _onComment = () => {
    if (user) {
      setIsComment(true);
      setIsVisible(true);
    } else {
      navigate(routes.ALERT_BOX, {
        title: I18n.t('evaluate.evaluate'),
        content: I18n.t('evaluate.label_rate'),
        handleConfirm: () =>
          navigate(routes.BOTTOM_TAB, {screen: routes.PROFILE_SCREEN}),
      });
    }
  };

  const _onAddCart = type => {
    if (arr_option?.length === 1 && arrOption1?.length === 1) {
      const option = convertOption(arr_option_tmp, arrOption1[0], '', '');
      if (option?.useWarehouse === 1 && option?.Quantity === 0) {
        CustomToast('Sản phẩm hiện tại đã hết hàng');
      } else {
        onUpdateCart(type, option);
      }
    } else {
      setIsVisible(true);
      setTypePress(type);
    }
  };

  const onUpdateCart = (type, optionSelect) => {
    isVisible && setIsVisible(false);
    productQty !== 1 && setProductQty(1);
    setOptions(['', '', '']);

    type === ADD_CART && onSetAnimated();
    type === BUY_NOW && navigate(routes.CART_SCREEN);

    if (user) {
      dispatch({
        type: actions.UPDATE_CART,
        params: {user},
        body: {
          item_id,
          quantity: productQty,
          option_id: optionSelect?.id,
          combo_info: useComboInfo(productBonus, isComBoGift),
        },
      });
    } else {
      dispatch({
        type: _onSuccess(actions.GET_CART),
        data: addCartToLocal({
          cart: cart || [],
          productQty,
          details: data,
          optionId: optionSelect?.id,
          combo_info: JSON.parse(useComboInfo(productBonus, isComBoGift)),
          is_combo: hasCombo ? 1 : 0,
          arr_gift: data?.combo?.arr_gift,
          arr_include: data?.combo?.array_product_bonus,
          gift_info: data?.combo?.arr_gift ? productBonus : [],
          include_info: data?.combo?.arr_gift ? [] : productBonus,
        }),
      });
    }
  };

  return (
    <Block>
      <Block row paddingBottom={30} backgroundColor="white" padding={12}>
        <Pressable style={styles.btnComment} onPress={_onComment}>
          <Image style={styles.iconComment} source={icons.comment} />
        </Pressable>
        <Pressable style={styles.btnCart} onPress={() => _onAddCart(ADD_CART)}>
          <Text size={13} fontType="semibold">
            {I18n.t('typeProduct.addCart')}
          </Text>
        </Pressable>
        <Pressable
          style={{
            ...styles.btnBuy,
            backgroundColor: config.general_active_color,
          }}
          onPress={() => _onAddCart(BUY_NOW)}>
          <Text size={13} color="white" fontType="semibold">
            {I18n.t('typeProduct.buy')}
          </Text>
        </Pressable>
      </Block>
      <ModalBox
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onBackdropPress={() => {
          setIsVisible(false);
          setIsComment(false);
        }}>
        {isComment ? (
          <AddComment
            setIsVisible={setIsVisible}
            setIsComment={setIsComment}
            hasCombo={hasCombo}
          />
        ) : (
          <ContentTypeProduct
            hasCombo={hasCombo}
            typPress={typePress}
            useQuantity={[productQty, setProductQty]}
            useOptions={[options, setOptions]}
            onUpdateCart={onUpdateCart}
          />
        )}
      </ModalBox>
      <Loading visible={isProductOption} />
    </Block>
  );
};

export default ChooseTypeProduct;

/* eslint-disable react-hooks/exhaustive-deps */
import {Block, Header, Loading} from '@components';
import {routes} from '@navigation/routes';
import actions, {_onUnmount} from '@redux/actions';
import {convertCart} from '@utils/helper';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Provisional from '../CartScreen/components/Provisional';
import Payment from '../PaymentScreen/components/Payment';
import Address from './components/Address';
import CustomContent from './components/CustomContent';
import FormVoucher from './components/FormVoucher';
import FormWCoin from './components/FormWCoin';
import SelectDelivery from './components/SelectDelivery';

const ConfirmScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState({});
  const [orderShip, setOrderShip] = useState({});
  const [orderMethod, setOrderMethod] = useState({});
  const [promotionCode, setPromotionCode] = useState('');
  const [wcoin, setWcoin] = useState('');

  const cart = useSelector(state => state.cart.data);
  const user = useSelector(state => state.tokenUser.data);
  const rAddress = useSelector(state => state.address);
  const rOrderMethod = useSelector(state => state.orderMethod);
  const rOrderShip = useSelector(state => state.orderShip);
  const isPriceShip = useSelector(state => state.priceShip.isLoading);
  const isPromotion = useSelector(state => state.usePromotion.isLoading);
  const isWCoin = useSelector(state => state.useWCoin.isLoading);

  const findAddress = rAddress?.data?.find(value => value.is_default === '1');

  useEffect(() => {
    address !== findAddress && setAddress(findAddress);
  }, [findAddress]);

  useEffect(() => {
    return dispatch({type: _onUnmount(actions.ORDER_COMPLETE_EXPIRED)});
  }, []);

  useEffect(() => {
    setOrderShip(rOrderShip?.data?.[0]);
    setOrderMethod(rOrderMethod?.data?.[0]);
  }, [rOrderMethod?.data, rOrderShip?.data]);

  useEffect(() => {
    dispatch({type: actions.GET_ORDER_SHIP});
    dispatch({type: actions.GET_ORDER_METHOD});
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch({
        type: actions.GET_ADDRESS,
        params: {user},
      });
      dispatch({
        type: actions.GET_USER_INFORMATION,
        params: {user},
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (orderShip?.shipping_id && address?.address) {
      dispatch({
        type: actions.GET_PRICE_SHIP,
        body: {
          cart: convertCart(cart),
          shipping: orderShip?.shipping_id,
          province: address?.province,
          district: address?.district,
          ward: address?.ward,
          address: address?.address,
        },
      });
    }
  }, [address, dispatch, orderShip]);

  useEffect(() => {
    return () => {
      dispatch({type: _onUnmount(actions.GET_ADDRESS)});
      dispatch({type: _onUnmount(actions.USE_PROMOTION)});
      dispatch({type: _onUnmount(actions.USE_WCOIN)});
      dispatch({type: _onUnmount(actions.GET_PRICE_SHIP)});
    };
  }, [dispatch]);

  const _onChangeAddress = () => {
    navigation.navigate(routes.ADDRESS_DETAILS, {
      address,
      onSetAddress: value => setAddress(value),
    });
  };

  const _onChangeOrderShip = () => {
    navigation.navigate(routes.ALERT_BOX, {
      CustomContent: (
        <CustomContent data={rOrderShip?.data} onPress={_onSetShip} />
      ),
    });
  };

  const _onChangePayment = () => {
    navigation.navigate(routes.ALERT_BOX, {
      CustomContent: (
        <CustomContent data={rOrderMethod?.data} onPress={_onSetMethod} />
      ),
    });
  };

  const _onSetShip = item => {
    setOrderShip(item);
    navigation.goBack();
  };

  const _onSetMethod = item => {
    setOrderMethod(item);
    navigation.goBack();
  };

  const _onPayment = () => {
    if (address) {
      navigation.navigate(routes.PAYMENT_SCREEN, {
        address,
        orderShip,
        orderMethod,
        promotionCode,
        cart,
        wcoin,
      });
    } else {
      Alert.alert(I18n.t('cart.addressherdle'));
    }
  };

  return (
    <Block flex backgroundColor="background">
      <Header canGoBack title={I18n.t('cart.formDelivery')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Address
          marginBottom={12}
          address={address}
          onPress={_onChangeAddress}
        />
        <Payment
          marginBottom={12}
          orderMethod={orderMethod}
          onPress={_onChangePayment}
        />
        <SelectDelivery
          data={cart}
          marginBottom={12}
          check={true}
          orderShip={orderShip}
          onSelect={_onChangeOrderShip}
        />
        <FormVoucher usePromotion={[promotionCode, setPromotionCode]} />
        {user && <FormWCoin useWCoin={[wcoin, setWcoin]} />}
      </ScrollView>
      <Provisional onPress={_onPayment} marginTop={12} />
      <Loading
        visible={
          rAddress?.isLoading ||
          rOrderMethod?.isLoading ||
          rOrderShip?.isLoading ||
          isPriceShip ||
          isPromotion ||
          isWCoin
        }
      />
    </Block>
  );
};

export default ConfirmScreen;

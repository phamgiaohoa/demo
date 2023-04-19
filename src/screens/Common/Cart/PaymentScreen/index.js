import {icons} from '@assets';
import {Block, FormContainer, Header, ModalBox} from '@components';
import {useMomo} from '@hooks';
import {navigate, reset} from '@navigation/RootNavigation';
import {routes} from '@navigation/routes';
import actions, {_onUnmount} from '@redux/actions';
import {theme} from '@theme';
import {MOMO, VNPAY} from '@utils/constants';
import {convertCart} from '@utils/helper';
import I18n from 'i18n';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  NativeEventEmitter,
  NativeModules,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Provisional from '../CartScreen/components/Provisional';
import Address from '../ConfirmScreen/components/Address';
import SelectDelivery from '../ConfirmScreen/components/SelectDelivery';
import Delivery from './components/Delivery';
import ExpiredProduct from './components/ExpiredProduct';
import FormBill from './components/FormBill';
import OrderRequest from './components/OrderRequest';
import Payment from './components/Payment';
import styles from './styles';

const RNMoMoPaymentModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule);

const PaymentScreen = ({route}) => {
  const {
    cart,
    address,
    orderShip,
    orderMethod,
    promotionCode,
    wcoin,
    orderDetails,
  } = route.params || {};
  const dispatch = useDispatch();
  const {handlePayment} = useMomo();
  const requestRef = useRef('');
  const emailRef = useRef('');
  const taxRef = useRef('');
  const addressRef = useRef('');
  const user = useSelector(state => state.tokenUser.data);
  const priceShip = useSelector(state => state.priceShip.data);
  const order = useSelector(state => state.orderComplete.data);
  const expired = useSelector(state => state.orderCompletedeExpired.data);
  const {isLoading} = useSelector(state => state.orderComplete);
  const inputRef = useRef();
  const config = useSelector(state => state.config.data);
  const [referral, setReferral] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const _onTextRequest = text => (requestRef.current = text);
  const _onTextEmail = text => (emailRef.current = text);
  const _onTextVat = text => (taxRef.current = text);
  const _onTextAddress = text => (addressRef.current = text);

  useEffect(() => {
    if (order) {
      if (order.payment.type?.toUpperCase() === VNPAY) {
        navigate(routes.VNPAY_SCREEN, {uri: order.payment.url});
      } else if (order.payment.type?.toUpperCase() === MOMO) {
        const data = {
          merchantcode: order.payment.partnerCode,
          description: order.payment.order_code,
          amount: order.payment.amount,
          orderId: order.payment.order_code,
        };
        _handlePayment(data);
      } else {
        reset(0, routes.SUCCESS_SCREEN);
      }
    }
  }, [_handlePayment, order]);

  //TODO: IOS PLATFORM
  useEffect(() => {
    EventEmitter.addListener(
      'RCTMoMoNoficationCenterRequestTokenReceived',
      response => {
        console.log('momo-response-ios', response);
        if (response?.status === '0') {
          dispatch({
            type: actions.PAYMENT_CONFIRM,
            body: {
              payment_type: 'momo',
              amount: order.payment.amount,
              ...response,
            },
          });
        }
      },
    );

    return () => {
      EventEmitter.removeAllListeners(
        'RCTMoMoNoficationCenterRequestTokenReceived',
      );
    };
  }, [dispatch, order]);

  useEffect(() => {
    expired !== null && setIsVisible(true);
  }, [dispatch, expired]);

  //TODO: ANDROID PLATFORM
  const _handlePayment = useCallback(
    data => {
      handlePayment(data, response => {
        console.log('momo-response-android', response);
        if (response?.status === 0) {
          dispatch({
            type: actions.PAYMENT_CONFIRM,
            body: {
              payment_type: 'momo',
              amount: order.payment.amount,
              ...response,
            },
          });
        }
      });
    },
    [dispatch, handlePayment, order],
  );

  const _onConfirm = () => {
    setIsVisible(false);
    dispatch({
      type: actions.ORDER_COMPLETE,
      params: {user},
      carts: {cart},
      body: {
        o_full_name: address.full_name,
        o_email: address.email,
        o_phone: address.phone,
        o_address: address.address,
        o_province: address.province,
        o_district: address.district,
        o_ward: address.ward,
        d_full_name: address.full_name,
        d_email: address.email,
        d_phone: address.phone,
        d_address: address.address,
        d_province: address.province,
        d_district: address.district,
        d_ward: address.ward,
        shipping_id: orderShip.shipping_id,
        method_id: orderMethod.method_id,
        request_more: requestRef.current,
        invoice_company: emailRef.current,
        invoice_tax_code: taxRef.current,
        invoice_address: addressRef.current,
        cart: convertCart(cart),
        shipping_price: priceShip,
        promotion_code: promotionCode,
        wcoin_use: wcoin,
        referral_code: referral,
      },
    });
  };

  const _renderProvisional = () => {
    return (
      <Provisional
        marginTop={12}
        disabled={isLoading}
        onPress={_onConfirm}
        orderDetails={orderDetails}
      />
    );
  };

  return (
    <Block flex backgroundColor="background">
      <Header canGoBack title={I18n.t('cart.orderConfirm')} />
      <FormContainer>
        <SelectDelivery
          data={cart}
          marginBottom={10}
          disable
          check={false}
          orderShip={orderShip}
        />
        <Address address={address} />
        <Delivery marginTop={10} orderShip={orderShip} />
        <Payment marginTop={10} orderMethod={orderMethod} />
        {!orderDetails && <OrderRequest onChangeText={_onTextRequest} />}
        <Block row paddingHorizontal={12} backgroundColor="white">
          <Block
            onPress={() => inputRef.current.focus()}
            style={{
              ...styles.inputWrap,
              borderColor: config.general_active_color,
            }}>
            <Image style={styles.iconCoupon} source={icons.referral} />
            <TextInput
              value={referral}
              style={styles.input}
              placeholder={'Mã giới thiệu'}
              placeholderTextColor={theme.colors.placeholder}
              onChangeText={text => setReferral(text)}
            />
          </Block>
        </Block>
        <ModalBox
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onBackdropPress={() => {
            setIsVisible(false);
            dispatch({type: _onUnmount(actions.ORDER_COMPLETE_EXPIRED)});
          }}>
          <ExpiredProduct setIsVisible={setIsVisible} />
        </ModalBox>
        {!orderDetails && (
          <FormBill
            onTextEmail={_onTextEmail}
            onTextVat={_onTextVat}
            onTextAddress={_onTextAddress}
          />
        )}

        {orderDetails && _renderProvisional()}
      </FormContainer>
      {!orderDetails && _renderProvisional()}
    </Block>
  );
};

export default PaymentScreen;

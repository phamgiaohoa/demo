import {Block, Button, Text} from '@components';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './styles';

const BoxPrice = ({label, price, isMinus, isPayment}) => {
  return (
    <Block
      row
      space="between"
      alignCenter
      marginBottom={5}
      style={isPayment ? styles.line : {}}>
      <Text
        size={isPayment ? 15 : 14}
        fontType={isPayment ? 'bold' : 'regular'}
        color={isPayment ? theme.colors.black : theme.colors.placeholder}>
        {label}
      </Text>
      <Text
        center
        size={isPayment ? 18 : 14}
        fontType={isPayment ? 'bold' : 'regular'}
        color={isPayment ? theme.colors.red : theme.colors.gray}>
        {isMinus && '- '}
        {convertCurrency(price)}{' '}
        <Text
          style={styles.underline}
          size={isPayment ? 18 : 14}
          fontType={isPayment ? 'bold' : 'regular'}
          color={isPayment ? theme.colors.red : theme.colors.gray}>
          đ
        </Text>
      </Text>
    </Block>
  );
};

const BoxContent = ({
  total_order,
  ship_price,
  promotion_price,
  wcoin_price,
  total_payment,
}) => {
  return (
    <Block backgroundColor={theme.colors.white} padding={10} radius={5}>
      <BoxPrice label={I18n.t('cart.provisional')} price={total_order} />
      {ship_price > 0 && (
        <BoxPrice label={I18n.t('cart.ship')} price={ship_price} />
      )}
      {promotion_price > 0 && (
        <BoxPrice
          label={I18n.t('cart.useVoucher')}
          price={promotion_price}
          isMinus
        />
      )}
      {wcoin_price > 0 && (
        <BoxPrice label={I18n.t('cart.useCoin')} price={wcoin_price} isMinus />
      )}
      <BoxPrice
        label={I18n.t('cart.totalPrice')}
        price={total_payment > 0 ? total_payment : 0}
        isPayment
      />
      <Text right color={theme.colors.gray}>
        {I18n.t('cart.vat')}
      </Text>
    </Block>
  );
};

const Provisional = ({orderDetails, disabled, onPress, ...props}) => {
  const [totalPay, setTotalPay] = useState(0);
  const cart = useSelector(state => state.cart);
  const priceShip = useSelector(state => state.priceShip.data);
  const promotion = useSelector(state => state.usePromotion.data);
  const wcoin = useSelector(state => state.useWCoin.data);

  useEffect(() => {
    let totalPayment = 0;
    if (!cart?.total_payment) {
      cart?.data?.map(({price_buy, quantity, include_info}) => {
        totalPayment = totalPayment + price_buy * quantity;
        include_info?.length &&
          include_info?.map(include => {
            totalPayment = totalPayment + include?.price_buy;
          });
      });
    } else {
      totalPayment = cart?.total_payment || 0;
    }
    setTotalPay(totalPayment);
  }, [cart]);

  const getTotalPayment = () => {
    const ship = priceShip || 0;
    const voucher = promotion?.data?.price || 0;
    const coin = wcoin?.data || 0;

    return totalPay + ship - voucher - coin;
  };

  return (
    <Block
      {...props}
      paddingLeft={12}
      paddingRight={12}
      paddingBottom={30}
      backgroundColor="white">
      {orderDetails ? (
        <BoxContent
          total_order={orderDetails.total_order}
          ship_price={orderDetails.shipping_price}
          promotion_price={orderDetails.promotion_price}
          wcoin_price={orderDetails.payment_wcoin2money}
          total_payment={orderDetails.total_payment}
        />
      ) : (
        <BoxContent
          total_order={totalPay}
          ship_price={priceShip}
          promotion_price={promotion?.data}
          wcoin_price={wcoin?.data}
          total_payment={getTotalPayment()}
        />
      )}
      {!orderDetails && (
        <Button
          disabled={disabled}
          title={I18n.t('cart.btnOrder')}
          style={styles.btnContinue}
          titleStyle={styles.textButton}
          onPress={onPress}
        />
      )}
    </Block>
  );
};

export default Provisional;

import {lottie} from '@assets';
import {Block, Button, Header, Text} from '@components';
import {routes} from '@navigation/routes';
import actions, {_onUnmount} from '@redux/actions';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import {width} from '@utils/responsive';
import I18n from 'i18n';
import LottieView from 'lottie-react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const SuccessScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.orderComplete);

  const _backToHome = () => {
    dispatch({type: _onUnmount(actions.ORDER_COMPLETE)});
    navigation.reset({
      index: 0,
      routes: [{name: routes.BOTTOM_TAB}],
    });
  };

  return (
    <Block flex backgroundColor="background">
      <Header title={I18n.t('cart.notifyOrder')} />
      <Block
        flex
        alignCenter
        justifyCenter
        backgroundColor={theme.colors.white}>
        <LottieView
          loop
          autoPlay
          source={lottie.payment_success}
          style={styles.lottie}
        />
        <Text size={15} fontType="bold">
          {I18n.t('cart.notifyOrder')}
        </Text>
        <Block width={width * 0.8} marginVertical={10}>
          <Text center color={theme.colors.placeholder}>
            {I18n.t('cart.note')}
          </Text>
        </Block>
        <Text size={18} fontType="bold" color={theme.colors.green}>
          {convertCurrency(data?.total_payment)} đ
        </Text>
        <Button
          title={I18n.t('cart.backHome')}
          onPress={_backToHome}
          style={styles.btnGoBack}
        />
      </Block>
    </Block>
  );
};

export default SuccessScreen;

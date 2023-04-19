import {icons} from '@assets';
import {Block, FormContainer, Text} from '@components';
import actions from '@redux/actions';
import {theme} from '@theme';
import {convertCart} from '@utils/helper';
import I18n from 'i18n';
import React, {useRef} from 'react';
import {Image, Pressable, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const FormWCoin = ({useWCoin}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const cart = useSelector(state => state.cart.data);
  const user = useSelector(state => state.tokenUser.data);
  const config = useSelector(state => state.config.data);
  const userInfo = useSelector(state => state.userInfo.data);
  const {isLoading} = useSelector(state => state.useWCoin);
  const [wcoin, setWcoin] = useWCoin;
  const coin = userInfo?.wcoin || 0;

  const _onChangeText = text => {
    if (coin - text > 0) {
      return setWcoin(text);
    }
    setWcoin(coin);
  };

  const _onApply = () => {
    dispatch({
      type: actions.USE_WCOIN,
      params: {
        user,
      },
      body: {
        wcoin_use: wcoin,
        cart: convertCart(cart),
      },
    });
  };

  return (
    <Block backgroundColor="white" padding={12}>
      <Text>
        {I18n.t('cart.wcoinTitle')}:{' '}
        <Text color={theme.colors.red}>{coin - wcoin}</Text>
      </Text>
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
              value={wcoin}
              onChangeText={_onChangeText}
              placeholderTextColor={theme.colors.placeholder}
              keyboardType="number-pad"
              placeholder={I18n.t('cart.wcoin')}
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

export default FormWCoin;

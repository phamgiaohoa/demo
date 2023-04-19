import {Block, Header} from '@components';
import {routes} from '@navigation/routes';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import I18n from 'i18n';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListCart from './components/ListCart';
import Provisional from './components/Provisional';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, isLoading} = useSelector(state => state.cart);
  const user = useSelector(state => state.tokenUser.data);
  const cartLength = data?.length ? ` (${data.length})` : '';

  useEffect(() => {
    if (user) {
      dispatch({
        type: actions.GET_CART,
        params: {
          user,
        },
      });
    }
  }, [dispatch, user]);

  const _onOrder = () => {
    navigation.navigate(routes.CONFIRM_SCREEN);
  };

  const _renderList = () => {
    if (!data?.length) {
      return <Empty content={I18n.t('cart.emptyCart')} />;
    }
    return (
      <Block flex>
        <ListCart />
        <Provisional onPress={_onOrder} disabled={isLoading} />
      </Block>
    );
  };

  return (
    <Block flex backgroundColor="background">
      <StatusBar translucent barStyle="light-content" />
      <Header canGoBack title={I18n.t('cart.cart') + cartLength} />
      {_renderList()}
    </Block>
  );
};

export default CartScreen;

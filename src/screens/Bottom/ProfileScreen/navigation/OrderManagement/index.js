import {Block, Header} from '@components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import actions from '@redux/actions';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListOrderStatus from './components/ListOrderStatus';

const Tab = createMaterialTopTabNavigator();

const OrderManament = ({route}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.orderStatus);
  const user = useSelector(state => state.tokenUser.data);

  useEffect(() => {
    dispatch({
      type: actions.GET_ORDER,
      params: {
        user,
      },
    });
  }, [dispatch, user]);

  return (
    <Block flex background="background">
      <Header canGoBack title={I18n.t('orderManagementScreen.orderManament')} />
      {data && (
        <Tab.Navigator
          lazy
          initialRouteName={route.params?.initialRouteName || data[0].title}
          tabBarOptions={{
            scrollEnabled: true,
            activeTintColor: theme.colors.blue,
            inactiveTintColor: theme.colors.placeholder,
            tabStyle: {
              width: 'auto',
            },
            labelStyle: {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: getSize.m(14),
            },
            indicatorStyle: {
              backgroundColor: theme.colors.blue,
            },
          }}>
          {data.map(item => (
            <Tab.Screen key={item.item_id} name={item.title}>
              {() => <ListOrderStatus is_status={item.item_id} />}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      )}
    </Block>
  );
};

export default OrderManament;

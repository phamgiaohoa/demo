import {Block, Header, Text} from '@components';
import LoadMore from '@components/Common/LoadMore';
import {ReferredPeopleHolder} from '@components/Common/PlaceHolder';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, Platform, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const OrderList = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {email, phone, user_id} = route.params.item;
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.tokenUser.data);
  const {data, totalPage, isLoading} = useSelector(
    state => state.Referred_Order,
  );
  const {bottom} = useSafeAreaInsets();
  useEffect(() => {
    dispatch({
      type: actions.GET_REFERRED_ORDER,
      params: {
        user,
        user_id,
        phone,
        email,
        p: 1,
      },
    });
  }, [dispatch, email, phone, user, user_id]);

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_REFERRED_ORDER,
        isLoadMore: true,
        params: {
          user,
          user_id,
          phone,
          email,
          p: page,
        },
      });
    }
  };

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    setPage(1);
    dispatch({
      type: actions.GET_REFERRED_ORDER,
      params: {
        user,
        user_id,
        phone,
        email,
        p: 1,
      },
    });
  };

  const __onPress = item => {
    item.view_order &&
      navigation.navigate(routes.REFERRED_ORDER_DETAILS, {
        order_id: item.order_id,
        email,
        phone,
        user_id,
      });
  };

  const _renderItem = ({item}) => (
    <Pressable
      radius={5}
      marginHorizontal={12}
      marginBottom={12}
      paddingHorizontal={12}
      paddingVertical={9}
      marginVertical={6}
      backgroundColor="white"
      onPress={() => __onPress(item)}>
      <Block row alignCenter marginVertical={3} space="between">
        <Text flex fontType="semibold" numberOfLines={1}>
          {I18n.t('referredPeople.codeorders')}:
          <Text numberOfLines={1}> #{item.order_code} </Text>
        </Text>
        <Text size={13} fontType="light" numberOfLines={1}>
          {moment(item.date_create * 1000).format('DD/MM/YYYY')}
        </Text>
      </Block>

      <Block row alignCenter marginVertical={3}>
        <Text fontType="semibold">{I18n.t('referredPeople.totalbill')}: </Text>
        <Text>
          <Text color={theme.colors.blue}>
            {convertCurrency(item.total_order)}{' '}
          </Text>
          VNĐ
        </Text>
      </Block>

      <Block row alignCenter marginVertical={3}>
        <Text fontType="semibold">
          {I18n.t('referredPeople.afterSubtracting')}:{' '}
        </Text>
        <Text>
          <Text color={theme.colors.green}>
            {convertCurrency(item.total_order_after_promotion)}{' '}
          </Text>
          VNĐ
        </Text>
      </Block>

      <Block row alignCenter marginVertical={3}>
        <Text fontType="semibold">{I18n.t('referredPeople.rose')}: </Text>
        <Text>
          <Text color="red">
            {convertCurrency(item.total_order_after_promotion)}{' '}
          </Text>{' '}
          VNĐ
        </Text>
      </Block>

      <Block row alignCenter marginVertical={3} space="between">
        <Block row alignCenter marginVertical={3}>
          <Text fontType="semibold">
            {I18n.t('referredPeople.roseStatus')}:{' '}
          </Text>
          <Text>{item.commission_status}</Text>
        </Block>
        <Block absolute top={10} right={0}>
          <Text color={theme.colors.red} fontType="semibold">
            {item.status_order}
          </Text>
        </Block>
      </Block>
    </Pressable>
  );
  const _renderList = () => {
    if (!refreshing && isLoading && page === 1) {
      return <ReferredPeopleHolder />;
    }
    if (!refreshing && !data?.length) {
      return <Empty content={I18n.t('affiliate.affiliate')} />;
    }

    return (
      <FlatList
        data={data || []}
        renderItem={_renderItem}
        onEndReached={_loadMore}
        refreshing={refreshing}
        onRefresh={_onRefresh}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `FormSuccess-${index}`}
        ItemSeparatorComponent={() => <Block height={8} />}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? bottom : getSize.m(12),
        }}
      />
    );
  };

  return (
    <Block flex backgroundColor={theme.colors.background}>
      <Header canGoBack title={I18n.t('referredPeople.orderedList')} />
      {_renderList()}
      {isLoading && page > 1 && <LoadMore />}
    </Block>
  );
};

export default OrderList;

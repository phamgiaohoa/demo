import {AnimatedImage, Block, Header, Text} from '@components';
import LoadMore from '@components/Common/LoadMore';
import {DeepLinkHolder} from '@components/Common/PlaceHolder';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {FlatList, Platform, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import InfoTotal from './components/InfoTotal';
import styles from './styles';

const OrderListDetails = ({route}) => {
  const dispatch = useDispatch();
  const {email, phone, user_id, order_id} = route.params;
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.tokenUser.data);
  const {data, totalPage, isLoading, info} = useSelector(
    state => state.Referred_Order_details,
  );
  const {bottom} = useSafeAreaInsets();
  useEffect(() => {
    dispatch({
      type: actions.GET_REFERRED_ORDER_DETAILS,
      params: {
        user,
        user_id,
        phone,
        email,
        order_id,
        p: 1,
      },
    });
  }, [dispatch, email, order_id, phone, user, user_id]);

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_REFERRED_ORDER_DETAILS,
        isLoadMore: true,
        params: {
          user,
          user_id,
          phone,
          order_id,
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
      type: actions.GET_REFERRED_ORDER_DETAILS,
      params: {
        user,
        user_id,
        phone,
        order_id,
        email,
        p: 1,
      },
    });
  };

  const _renderItem = ({item}) => (
    <Block
      radius={5}
      marginHorizontal={12}
      marginBottom={12}
      backgroundColor="white">
      <Pressable style={styles.pressablestyle}>
        <AnimatedImage
          thumbnail={item.picture}
          source={item.picture}
          style={styles.image}
        />
        <Block flex padding={8}>
          <Text numberOfLines={2}>{item.title}</Text>
          <Text marginTop={5} size={16} color="red" fontType="semibold">
            {convertCurrency(item.price_buy)} đ{' '}
            <Text fontType="semibold">x{item.quantity}</Text>
          </Text>
          <Text size={12} marginVertical={5} fontType="semibold">
            {I18n.t('referredPeople.UseCode_KM')}: -{' '}
            <Text>{convertCurrency(item.promotion_price_minus)}</Text> vnđ
          </Text>
          <Text size={12} marginVertical={5} fontType="semibold">
            {I18n.t('referredPeople.Calculate')}:{' '}
            <Text>{item.percent_deeplink}</Text> %
          </Text>
          <Text size={12} marginVertical={5} fontType="semibold">
            {I18n.t('referredPeople.rose')}:{' '}
            <Text>{convertCurrency(item.commission)}</Text> vnđ
          </Text>
        </Block>
      </Pressable>
    </Block>
  );
  const _renderList = () => {
    if (!refreshing && isLoading && page === 1) {
      return <DeepLinkHolder />;
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
      <InfoTotal info={info} />
    </Block>
  );
};

export default OrderListDetails;

import {lottie} from '@assets';
import {Block} from '@components';
import NotificationItem from '@components/Common/ItemList/NotificationItem';
import LoadMore from '@components/Common/LoadMore';
import {NotificationHolder} from '@components/Common/PlaceHolder';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ContentNotification = ({type_of}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.tokenUser.data);
  const general = useSelector(state => state.notificationGeneral);
  const personal = useSelector(state => state.notificationPersonal);
  const promotion = useSelector(state => state.notificationPromotion);

  const action =
    type_of === 'system'
      ? actions.GET_NOTIFICATION_GENERAL
      : type_of === 'personal'
      ? actions.GET_NOTIFICATION_PERSONAL
      : actions.GET_NOTIFICATION_PROMOTION;

  const data =
    type_of === 'system'
      ? general.data
      : type_of === 'personal'
      ? personal.data
      : promotion.data;

  const isLoading =
    type_of === 'system'
      ? general.isLoading
      : type_of === 'personal'
      ? personal.isLoading
      : promotion.isLoading;

  const totalPage =
    type_of === 'system'
      ? general.totalPage
      : type_of === 'personal'
      ? personal.totalPage
      : promotion.totalPage;

  useEffect(() => {
    if (user) {
      dispatch({
        type: action,
        params: {
          user,
          p: 1,
          type_of,
        },
      });
    }
  }, [action, dispatch, type_of, user]);

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    setPage(1);
    dispatch({
      type: action,
      params: {
        user,
        p: 1,
        type_of,
      },
    });
    dispatch({
      type: actions.GET_TOTAL_NOTIFICATION,
      params: {
        user,
        type: 'reading',
      },
    });
  };

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: action,
        isLoadMore: true,
        params: {
          user,
          p: page + 1,
          type_of,
        },
      });
    }
  };

  const _itemSeparator = () => (
    <Block height={1} backgroundColor="background" />
  );

  const _keyExtractor = (_, index) => String(index);

  const _renderEmpty = () => (
    <Empty
      lottie={lottie.bell}
      imageStyles={styles.icon}
      content={I18n.t('notificationScreen.note')}
    />
  );

  const _renderItem = ({item}) => {
    return (
      <NotificationItem
        item_id={item.item_id}
        image={item.picture}
        title={item.title}
        short={item.short}
        date_create={item.date_create}
        isReading={item.status === 'reading'}
      />
    );
  };

  return (
    <Block flex>
      {isLoading && !data && <NotificationHolder />}
      {!isLoading && !data?.length ? (
        _renderEmpty()
      ) : (
        <FlatList
          data={data}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
          onRefresh={_onRefresh}
          refreshing={refreshing}
          onEndReached={_loadMore}
          ItemSeparatorComponent={_itemSeparator}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      )}
      {isLoading && page > 1 && <LoadMore />}
    </Block>
  );
};

export default ContentNotification;

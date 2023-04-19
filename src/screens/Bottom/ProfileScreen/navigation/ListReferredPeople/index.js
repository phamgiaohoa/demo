import {icons} from '@assets';
import {Block, Header, Text} from '@components';
import LoadMore from '@components/Common/LoadMore';
import {ReferredPeopleHolder} from '@components/Common/PlaceHolder';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import actions, {_onUnmount} from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {Buffer} from 'buffer';
import I18n from 'i18n';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Platform, Pressable} from 'react-native';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
global.Buffer = Buffer;

const ListReferredPeople = ({friendly_link}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const {bottom} = useSafeAreaInsets();
  const user = useSelector(state => state.tokenUser.data);
  const {data, totalPage, isLoading} = useSelector(
    state => state.ReferredPeople,
  );

  useEffect(() => {
    dispatch({
      type: actions.GET_LIST_REFERRED_PEOPLE,
      params: {
        user,
        p: 1,
      },
    });

    return () => dispatch({type: _onUnmount(actions.GET_LIST_REFERRED_PEOPLE)});
  }, [dispatch, user]);

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    setPage(1);
    dispatch({
      type: actions.GET_LIST_REFERRED_PEOPLE,
      params: {
        user,
        p: 1,
      },
    });
  };

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_LIST_REFERRED_PEOPLE,
        isLoadMore: true,
        params: {
          user,
          p: page + 1,
        },
      });
    }
  };

  const __onPress = item => {
    navigation.navigate(routes.REFERRED_ORDER, {item});
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
        <Text fontType="semibold">
          {I18n.t('referredPeople.email')}: <Text>{item.email}</Text>
        </Text>

        <Text size={13} fontType="light">
          {moment(item.date_create * 1000).format('DD/MM/YYYY')}
        </Text>
      </Block>

      <Block row alignCenter marginVertical={3}>
        <Text fontType="semibold">{I18n.t('referredPeople.phone')}: </Text>
        <Text>{item.phone}</Text>
      </Block>

      <Block row alignCenter marginVertical={3} space="between">
        <Text flex fontType="semibold" numberOfLines={1}>
          {I18n.t('referredPeople.referred')}:
          <Text numberOfLines={1}> {item.full_name} </Text>
        </Text>
        <Menu>
          <MenuTrigger>
            <Image style={styles.iconInfo} source={icons.question} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.optionStyle}>
            <Block
              flex
              padding={12}
              radius={5}
              backgroundColor={theme.colors.placeholder}>
              <Text color="white">
                {item.recommend_link || 'Chưa có thành viên'}
              </Text>
            </Block>
          </MenuOptions>
        </Menu>
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
      <Header canGoBack title={I18n.t('profileScreen.referrerTitle')} />
      {_renderList()}
      {isLoading && page > 1 && <LoadMore />}
    </Block>
  );
};

export default ListReferredPeople;

import {Block, Header} from '@components';
import HorizontalProductItem from '@components/Common/ItemList/HorizontalProductItem';
import LoadMore from '@components/Common/LoadMore';
import {ProductHolder} from '@components/Common/PlaceHolder';
import {routes} from '@navigation/routes';
import {useIsFocused} from '@react-navigation/native';
import actions, {_onUnmount} from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ListProduct = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {title, type} = route.params;
  const [page, setPage] = useState(1);
  const user = useSelector(state => state.tokenUser.data);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const favorited = useSelector(state => state.favorited.data);
  const viewed = useSelector(state => state.viewed.data);
  const later = useSelector(state => state.later.data);
  const favorited_isLoading = useSelector(state => state.favorited.isLoading);
  const viewed_isLoading = useSelector(state => state.viewed.isLoading);
  const later_isLoading = useSelector(state => state.later.isLoading);
  const favorited_totalPage = useSelector(state => state.favorited.totalPage);
  const viewed_totalPage = useSelector(state => state.viewed.totalPage);
  const later_totalPage = useSelector(state => state.later.totalPage);

  const isHolder =
    type === 'LIKED'
      ? favorited_isLoading
      : type === 'WATCHED'
      ? viewed_isLoading
      : later_isLoading;
  const totalPage =
    type === 'LIKED'
      ? favorited_totalPage
      : type === 'WATCHED'
      ? viewed_totalPage
      : later_totalPage;
  const DATA =
    type === 'LIKED' ? favorited : type === 'WATCHED' ? viewed : later;

  const action =
    type === 'LIKED'
      ? actions.GET_FAVORITE_PRODUCT
      : type === 'WATCHED'
      ? actions.GET_VIEWED_PRODUCT
      : actions.GET_LATER_PRODUCT;

  useEffect(() => {
    setPage(1);
    dispatch({type: _onUnmount(action)});
    dispatch({
      type: action,
      params: {
        user,
        p: 1,
      },
    });
    return () => {
      dispatch({type: _onUnmount(actions.GET_LATER_PRODUCT)});
      dispatch({type: _onUnmount(actions.GET_VIEWED_PRODUCT)});
      dispatch({type: _onUnmount(actions.GET_FAVORITE_PRODUCT)});
    };
  }, [dispatch, type, user, isFocused, action]);

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: action,
        isLoadMore: true,
        params: {
          user,
          p: page + 1,
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
      type: action,
      params: {
        user,
        p: 1,
      },
    });
  };

  const _renderItem = ({item}) => (
    <HorizontalProductItem
      thumbnail={item.thumbnail}
      image={item.picture}
      title={item.title}
      priceBuy={convertCurrency(item.price_buy)}
      price={convertCurrency(item.price)}
      salePercent={item.percent_discount}
      rate={parseInt(item.rating, 10)}
      item_id={item.item_id}
      is_new={item.is_new}
      is_combo={item.is_combo}
      type={type}
    />
  );

  const _onEmpty = () => navigation.navigate(routes.HOME_SCREEN);

  const _renderEmpty = () => (
    <Empty
      content={
        type === 'LIKED'
          ? I18n.t('favorite.No_favorite')
          : type === 'WATCHED'
          ? I18n.t('favorite.No_products_viewed')
          : I18n.t('favorite.No_post_purchase')
      }
      contentMore={I18n.t('favorite.Continue_shopping')}
      onPress={_onEmpty}
    />
  );

  return (
    <Block flex backgroundColor={theme.colors.background}>
      <Header title={title} canGoBack />
      {isHolder && !DATA && <ProductHolder />}
      {!isHolder && !DATA?.length ? (
        _renderEmpty()
      ) : (
        <Block flex>
          <FlatList
            numColumns={1}
            data={DATA}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.item_id}
            renderItem={_renderItem}
            onEndReached={_loadMore}
            onRefresh={_onRefresh}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.5}
            style={styles.flatList}
            refreshing={refreshing}
          />
          {isHolder && page > 1 && <LoadMore />}
        </Block>
      )}
    </Block>
  );
};

export default ListProduct;

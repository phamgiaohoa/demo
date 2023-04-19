/* eslint-disable react-hooks/exhaustive-deps */
import {Block, Header} from '@components';
import ProductItem from '@components/Common/ItemList/ProductItem';
import LoadMore from '@components/Common/LoadMore';
import {ListHolder, ListHorizontalHolder} from '@components/Common/PlaceHolder';
import actions, {_onUnmount} from '@redux/actions';
import GroupSub from '@screens/Bottom/CategoryScreen/AllProductScreen/components/GroupSub';
import ItemList from '@screens/Bottom/CategoryScreen/AllProductScreen/components/ItemList';
import Empty from '@screens/Common/Empty';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import React, {createContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const SearchDetails = createContext({});

const SearchDetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(null);
  const [isList, setIsList] = useState(false);
  const {data, isLoading, totalPage} = useSelector(
    state => state.searchDetails,
  );

  useEffect(() => {
    setPage(1);
    dispatch({
      type: actions.GET_SEARCH_DETAILS,
      params: {
        keyword: route.params.search,
        p: 1,
      },
    });
    return () => dispatch({type: _onUnmount(actions.GET_SEARCH_DETAILS)});
  }, [dispatch]);

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_SEARCH_DETAILS,
        params: {
          keyword: route.params.search,
          p: page + 1,
          sort: sort || '',
          average_rating: rating?.value || '',
          price_min: price?.min || '0',
          price_max: price?.max || '10000000',
        },
      });
    }
  };

  const _renderItemMenu = ({item}) => (
    <ProductItem
      thumbnail={item.thumbnail}
      image={item.picture}
      title={item.title}
      priceBuy={convertCurrency(item.price_buy)}
      price={convertCurrency(item.price)}
      salePercent={item.percent_discount}
      rate={parseInt(item.rating, 10)}
      is_new={item.is_new}
      item_id={item.item_id}
    />
  );

  const _renderItemList = ({item}) => (
    <ItemList
      thumbnail={item.thumbnail}
      image={item.picture}
      title={item.title}
      priceBuy={convertCurrency(item.price_buy)}
      price={convertCurrency(item.price)}
      salePercent={item.percent_discount}
      rate={parseInt(item.rating, 10)}
      is_new={item.is_new}
      item_id={item.item_id}
    />
  );

  const _renderList = () => {
    if (isLoading && page === 1 && isList) {
      return <ListHorizontalHolder />;
    }
    if (isLoading && page === 1 && !isList) {
      return <ListHolder />;
    }
    return (
      <FlatList
        key={isList ? 'LIST' : 'MENU'}
        numColumns={isList ? 1 : 2}
        data={data}
        keyExtractor={item => item.item_id}
        renderItem={isList ? _renderItemList : _renderItemMenu}
        onEndReached={_loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => <Empty />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        contentContainerStyle={isList ? {} : {paddingLeft: getSize.m(7)}}
        ItemSeparatorComponent={() => (isList ? <Block height={10} /> : null)}
      />
    );
  };

  return (
    <SearchDetails.Provider
      value={{
        setPage,
        groupId: 'SEARCH',
        isList,
        setIsList,
        sort,
        setSort,
        rating,
        setRating,
        price,
        setPrice,
      }}>
      <Block flex backgroundColor="background">
        <Header
          canGoBack
          renderSearch
          renderCart
          valueSearch={route.params.search}
        />
        <GroupSub context={SearchDetails} />
        <Block flex>
          {_renderList()}
          {isLoading && page > 1 && <LoadMore />}
        </Block>
      </Block>
    </SearchDetails.Provider>
  );
};

export default SearchDetailsScreen;

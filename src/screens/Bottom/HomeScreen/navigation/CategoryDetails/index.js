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

export const CategoryProvider = createContext({});

const CategoryDetails = ({route}) => {
  const dispatch = useDispatch();
  const {title, apply_group} = route.params;
  const {data, totalPage, isLoading} = useSelector(state => state.product);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(null);
  const [isList, setIsList] = useState(false);

  useEffect(() => {
    setPage(1);
    dispatch({
      type: actions.GET_PRODUCT,
      params: {
        group_id: apply_group,
        p: 1,
        sort: sort || '',
        average_rating: rating?.value || '',
        price_min: price?.min || '0',
        price_max: price?.max || '10000000',
      },
    });
    return () => dispatch({type: _onUnmount(actions.GET_PRODUCT)});
  }, [dispatch, apply_group]);

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_PRODUCT,
        params: {
          group_id: apply_group,
          p: page + 1,
          sort: sort || '',
          average_rating: rating?.value || '',
          price_min: price?.min || '0',
          price_max: price?.max || '10000000',
        },
      });
    }
  };

  const _renderEmptyList = () => <Empty />;

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

  return (
    <CategoryProvider.Provider
      value={{
        setPage,
        groupId: apply_group,
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
        <Header canGoBack title={title} />
        <GroupSub context={CategoryProvider} />
        <Block flex>
          {isLoading &&
            !data &&
            (isList ? <ListHorizontalHolder /> : <ListHolder />)}
          {!isLoading && !data?.length ? (
            _renderEmptyList()
          ) : (
            <FlatList
              key={isList ? 'LIST' : 'MENU'}
              numColumns={isList ? 1 : 2}
              data={data}
              keyExtractor={item => item.item_id}
              renderItem={isList ? _renderItemList : _renderItemMenu}
              onEndReached={_loadMore}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              contentContainerStyle={isList ? {} : {paddingLeft: getSize.m(7)}}
              ItemSeparatorComponent={() =>
                isList ? <Block height={10} /> : null
              }
            />
          )}
          {isLoading && page > 1 && <LoadMore />}
        </Block>
      </Block>
    </CategoryProvider.Provider>
  );
};

export default CategoryDetails;

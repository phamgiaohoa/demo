/* eslint-disable react-hooks/exhaustive-deps */
import {Block, Header} from '@components';
import ProductItem from '@components/Common/ItemList/ProductItem';
import LoadMore from '@components/Common/LoadMore';
import {ListHolder, ListHorizontalHolder} from '@components/Common/PlaceHolder';
import actions, {_onUnmount} from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import React, {createContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CategoryTree from './components/CategoryTree';
import GroupSub from './components/GroupSub';
import ItemList from './components/ItemList';
import ListGroupSub from './components/ListGroupSub';

export const AllProduct = createContext({});

const AllProductScreen = ({route}) => {
  const dispatch = useDispatch();
  const {deeplink_code} = route.params;
  const user = useSelector(state => state.tokenUser.data);
  const {data, totalPage, isLoading} = useSelector(state => state.product);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(null);
  const [groupId, setGroupId] = useState(route.params.group_id);
  const [titleHeader, setTitleHeader] = useState(route.params.title);
  const [friendly_link, setFriendly_link] = useState(
    route.params.friendly_link,
  );
  const [isList, setIsList] = useState(false);
  const [dataTree, setDataTree] = useState([]);

  useEffect(() => {
    if (deeplink_code) {
      if (user) {
        dispatch({
          type: actions.ADD_USER_RECOMMEND,
          body: {deeplink_code},
          params: {user},
        });
      }
    }
  }, [deeplink_code, dispatch, user]);

  useEffect(() => {
    setPage(1);
    dispatch({
      type: actions.GET_PRODUCT,
      params: {
        group_id: groupId,
        p: 1,
        sort: sort || '',
        average_rating: rating?.value || '',
        price_min: price?.min || '0',
        price_max: price?.max || '10000000',
      },
    });

    return () => dispatch({type: _onUnmount(actions.GET_PRODUCT)});
  }, [dispatch, groupId]);

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_PRODUCT,
        params: {
          group_id: groupId,
          p: page + 1,
          sort: sort || '',
          average_rating: rating?.value || '',
          price_min: price?.min || '0',
          price_max: price?.max || '10000000',
        },
      });
    }
  };

  const onSelectGroupSub = item => {
    setGroupId(item.group_id);
    setTitleHeader(item.title);
    setFriendly_link(item.friendly_link);
    setDataTree([...dataTree, item]);
  };

  const _renderEmpty = () => <Empty />;

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
    return (
      <FlatList
        key={isList ? 'LIST' : 'MENU'}
        data={data}
        numColumns={isList ? 1 : 2}
        keyExtractor={(_, index) =>
          isList ? `LIST-${index}` : `MENU-${index}`
        }
        renderItem={isList ? _renderItemList : _renderItemMenu}
        onEndReached={_loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        contentContainerStyle={isList ? {} : {paddingLeft: getSize.m(7)}}
        ItemSeparatorComponent={() => (isList ? <Block height={10} /> : null)}
      />
    );
  };

  return (
    <AllProduct.Provider
      value={{
        page,
        setPage,
        sort,
        setSort,
        rating,
        setRating,
        price,
        setPrice,
        groupId,
        setGroupId,
        titleHeader,
        setTitleHeader,
        isList,
        setIsList,
        onSelectGroupSub,
      }}>
      <Block flex backgroundColor="background">
        <Header canGoBack renderSearch renderCart title={titleHeader} />
        <CategoryTree
          data={dataTree}
          setData={setDataTree}
          friendly_link={friendly_link}
        />
        <GroupSub context={AllProduct} />
        <ListGroupSub />
        {isLoading &&
          !data &&
          (isList ? <ListHorizontalHolder /> : <ListHolder />)}
        {!isLoading && !data?.length ? _renderEmpty() : _renderList()}
        {isLoading && page > 1 && <LoadMore />}
      </Block>
    </AllProduct.Provider>
  );
};

export default AllProductScreen;

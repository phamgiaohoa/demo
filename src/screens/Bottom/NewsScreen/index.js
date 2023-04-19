import {lottie} from '@assets';
import {Block, Header, Text} from '@components';
import NewsItem from '@components/Common/ItemList/NewsItem';
import LoadMore from '@components/Common/LoadMore';
import {NewsHolder} from '@components/Common/PlaceHolder';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HotNews from './HotNews';

const NewsScreen = () => {
  const dispatch = useDispatch();
  const {data, totalPage, isLoading} = useSelector(state => state.news);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    dispatch({
      type: actions.GET_NEWS,
      params: {
        p: 1,
        numshow: 12,
      },
    });
  }, [dispatch]);

  const _renderItem = ({item}) => (
    <NewsItem
      item_id={item.item_id}
      thumbnail={item.thumbnail}
      image={item.picture}
      title={item.title}
      short={item.short}
      date_update={item.date_update}
    />
  );

  const _renderHeader = () => (
    <HotNews data={data?.slice(0, 4)} index={index} setIndex={setIndex} />
  );

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_NEWS,
        isLoadMore: true,
        params: {
          p: page + 1,
          numshow: 12,
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
      type: actions.GET_NEWS,
      params: {
        p: 1,
        numshow: 12,
      },
    });
  };

  const _renderEmpty = () => (
    <Empty lottie={lottie.news} content={I18n.t('newsScreen.note')} />
  );

  return (
    <Block flex backgroundColor="background">
      <Header title={I18n.t('newsScreen.label')} />
      {isLoading && !data && <NewsHolder />}
      {!isLoading && !data?.length ? (
        _renderEmpty()
      ) : (
        <Block flex>
          <Block row alignCenter marginVertical={12} marginLeft={10}>
            <Block height={8} width={8} marginRight={5} backgroundColor="red" />
            <Text fontType="semibold">{I18n.t('newsScreen.news')} </Text>
          </Block>
          <FlatList
            data={data?.slice(4)}
            keyExtractor={item => item.item_id}
            onEndReachedThreshold={0.5}
            renderItem={_renderItem}
            onRefresh={_onRefresh}
            onEndReached={_loadMore}
            ListHeaderComponent={_renderHeader}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
          />
          {isLoading && page > 1 && <LoadMore />}
        </Block>
      )}
    </Block>
  );
};

export default NewsScreen;

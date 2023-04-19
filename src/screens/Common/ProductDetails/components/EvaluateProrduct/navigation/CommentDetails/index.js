import {Block, Header, Text} from '@components';
import LoadMore from '@components/Common/LoadMore';
import {EvaluateHolder} from '@components/Common/PlaceHolder';
import Rating from '@components/Common/Rating';
import actions from '@redux/actions';
import {height} from '@utils/responsive';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Comment from './../../../Comment';
import RenderProgress from './../../../RenderProgress';

const CommentDetails = ({route}) => {
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails.data);
  const [page, setPage] = useState(1);
  const {data, totalPage, isLoading} = useSelector(state => state.review);
  const [refreshing, setRefreshing] = useState(false);
  const rCombo = useSelector(state => state.comboProductDetails.data);
  const dataDetails = route.params.hasCombo ? rCombo : productDetails;

  useEffect(() => {
    setPage(1);
  }, []);

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    setPage(1);
    dispatch({
      type: actions.GET_REVIEWS_PRODUCT,
      params: {
        item_id: route.params.item_id,
        p: 1,
      },
    });
  };

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_REVIEWS_PRODUCT,
        isLoadMore: true,
        params: {
          item_id: route.params.item_id,
          p: page + 1,
        },
      });
    }
  };

  const _renderHeader = () => {
    return (
      <Block padding={12} backgroundColor="white">
        <Text size={16} marginVertical={7} fontType="semibold">
          {I18n.t('evaluate.product')}
        </Text>
        <Block row alignCenter>
          <Block alignCenter justifyCenter marginRight={10}>
            <Text marginBottom={8} size={26} fontType="bold">
              {dataDetails?.rating?.average}
            </Text>
            <Rating
              imageSize={13}
              startingValue={dataDetails?.rating?.average}
            />
            <Text marginTop={8}>
              {dataDetails?.rating?.count &&
              Object.values(dataDetails?.rating?.count).length > 0
                ? Object.values(dataDetails?.rating?.count)?.reduce(
                    (total, item) => total + item,
                  )
                : null}{' '}
              {I18n.t('evaluate.comment')}
            </Text>
          </Block>
          <Block
            alignSelf="center"
            width={1}
            marginRight={12}
            height={height * 0.1}
            backgroundColor="smoke"
          />
          <Block flex>
            <FlatList
              data={
                dataDetails?.rating?.count
                  ? Object.values(dataDetails?.rating?.count)
                  : []
              }
              renderItem={({item, index}) => (
                <RenderProgress
                  item={item}
                  index={index}
                  hasCombo={route.params.hasCombo}
                />
              )}
              keyExtractor={(_, index) => String(index)}
            />
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex backgroundColor="white">
      <Header title={I18n.t('evaluate.reviews')} canGoBack />
      {isLoading && !data && <EvaluateHolder />}
      {!isLoading && !data?.length ? null : (
        <FlatList
          data={data}
          renderItem={({item}) => <Comment item={item} />}
          keyExtractor={(_, index) => String(index)}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          onEndReached={_loadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={_onRefresh}
          ListHeaderComponent={_renderHeader}
        />
      )}

      {isLoading && page > 1 && <LoadMore />}
    </Block>
  );
};

export default CommentDetails;

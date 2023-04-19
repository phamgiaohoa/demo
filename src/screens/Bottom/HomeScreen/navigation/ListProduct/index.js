import {icons} from '@assets';
import {AnimatedImage, Block, Header, Text} from '@components';
import LoadMore from '@components/Common/LoadMore';
import {ListHolder} from '@components/Common/PlaceHolder';
import {routes} from '@navigation/routes';
import actions, {_onUnmount} from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {convertCurrency} from '@utils/helper';
import {width} from '@utils/responsive';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ListProduct = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {title = '', group_id} = route.params || {};
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const {data, totalPage, isLoading, total} = useSelector(
    state => state.comboAll,
  );

  useEffect(() => {
    dispatch({
      type: actions.GET_COMBO_ALL,
    });
    return () => {
      dispatch({type: _onUnmount(actions.GET_COMBO_ALL)});
    };
  }, [dispatch, group_id]);

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_COMBO_ALL,
        isLoadMore: true,
        params: {
          p: page + 1,
        },
      });
    }
  };

  const _onRefresh = () => {
    setPage(1);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    dispatch({
      type: actions.GET_COMBO_ALL,
    });
  };

  const _renderSeparator = () => <Block height={12} />;

  const _keyExtractor = item => item.item_id;

  const _renderItem = ({item}) => {
    const _onMoveDetails = () => {
      navigation.navigate(routes.PRODUCT_DETAIL, {
        item_id: item?.item_id,
      });
    };

    return (
      <Pressable onPress={_onMoveDetails}>
        <Block
          flex
          radius={10}
          width={(width - 34) / 2}
          backgroundColor="white"
          overflow="hidden">
          <AnimatedImage
            style={styles.itemProduct}
            thumbnail={item?.thumbnail}
            source={item?.picture}
          />
          <Block flex padding={10} space="between">
            <Text fontType="bold" numberOfLines={2}>
              {item?.title}
            </Text>
            <Text fontType="bold" color="darkRed" numberOfLines={1}>
              {convertCurrency(item?.price_buy)} đ{' '}
              <Text size={12} color="gray2" textDecorationLine="line-through">
                {convertCurrency(item?.price)} đ
              </Text>
            </Text>
          </Block>
        </Block>
      </Pressable>
    );
  };

  const _renderContent = () => {
    if (!refreshing && !data && isLoading) {
      return <ListHolder />;
    }

    if (!data?.length) {
      return (
        <Empty icon={icons.empty_list} content="Combo ưu đãi chưa cập nhật." />
      );
    }

    return (
      <Block flex>
        <Block row alignCenter marginBottom={15}>
          <Text size={16} fontType="bold" color="darkRed">
            Tất cả{' '}
          </Text>
          <Text size={11}>({total} sản phẩm)</Text>
        </Block>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          onEndReached={_loadMore}
          onRefresh={_onRefresh}
          refreshing={refreshing}
          ItemSeparatorComponent={_renderSeparator}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          columnWrapperStyle={styles.contentWrap}
        />
        {page > 1 && isLoading && <LoadMore />}
      </Block>
    );
  };

  return (
    <Block flex backgroundColor="background">
      <Header title={title} canGoBack />
      <Block flex padding={12}>
        {_renderContent()}
      </Block>
    </Block>
  );
};

export default ListProduct;

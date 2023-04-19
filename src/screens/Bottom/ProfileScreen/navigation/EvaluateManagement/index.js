import {lottie} from '@assets';
import {AnimatedImage, Block, Header, Text} from '@components';
import UserRatingHolder from '@components/Common/PlaceHolder/UserRatingHolder';
import Rating from '@components/Common/Rating';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import I18n from 'i18n';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const EvaluateManagement = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.tokenUser.data);
  const {data, totalPage, isLoading} = useSelector(state => state.userRating);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch({
      type: actions.USER_RATING,
      params: {
        user,
        p: 1,
      },
    });
  }, [dispatch, user]);

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    setPage(1);
    dispatch({
      type: actions.USER_RATING,
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
        type: actions.USER_RATING,
        isLoadMore: true,
        params: {
          user,
          p: page + 1,
        },
      });
    }
  };

  const _renderEmpty = () => (
    <Empty
      lottie={lottie.myReview}
      content={I18n.t('myReview.empty')}
      contentMore={I18n.t('myReview.emptyMore')}
    />
  );

  // const _listImage = (uri, i) => {
  //   return (
  //     <AnimatedImage
  //       key={i}
  //       source={uri}
  //       thumbnail={uri}
  //       style={styles.imageList}
  //     />
  //   );
  // };

  const _onPress = item =>
    navigation.navigate(routes.PRODUCT_DETAIL, {
      title: item.product.title,
      item_id: item.product.item_id,
      hasCombo: item.is_combo ? true : false,
    });

  const _renderItem = ({item}) => {
    return (
      <Pressable style={styles.btnProduct} onPress={() => _onPress(item)}>
        <AnimatedImage
          source={item.product.picture}
          thumbnail={item.product.picture}
          style={styles.image}
        />

        <Block flex>
          <Text size={13}>{item.product.title}</Text>
          <Text size={11} marginVertical={5} fontType="light">
            {moment(parseInt(item.date_create, 10) * 1000).format('DD/MM/YYYY')}
          </Text>
          <Rating imageSize={12} startingValue={parseInt(item.rate, 10)} />
          <Text marginVertical={10}>{item.content}</Text>
          {/* <Block row wrap>
            {item.picture.map(_listImage)}
          </Block> */}
        </Block>
      </Pressable>
    );
  };

  return (
    <Block flex backgroundColor={theme.colors.background}>
      <StatusBar translucent barStyle="dark-content" />
      <Header title={I18n.t('profileScreen.evaluation')} canGoBack />
      {isLoading && !data && <UserRatingHolder />}
      {!isLoading && !data?.length ? (
        _renderEmpty()
      ) : (
        <Block flex paddingHorizontal={12} paddingBottom={20} marginTop={12}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(_, index) => String(index)}
            renderItem={_renderItem}
            ItemSeparatorComponent={() => <Block height={12} />}
            removeClippedSubviews={true}
            onEndReached={_loadMore}
            onRefresh={_onRefresh}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
          />
        </Block>
      )}
    </Block>
  );
};

export default EvaluateManagement;

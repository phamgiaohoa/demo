import {lottie} from '@assets';
import {Block, Header, Loading} from '@components';
import {MyGiftHolder} from '@components/Common/PlaceHolder';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import ItemGift from './components/ItemGift';
import styles from './styles';

const MyGift = () => {
  const dispatch = useDispatch();
  const {bottom} = useSafeAreaInsets();
  const user = useSelector(state => state.tokenUser.data);
  const {data, isLoading} = useSelector(state => state.gift);
  const isCheckGift = useSelector(state => state.checkGift.isLoading);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch({
      type: actions.GET_USER_GIFT,
      params: {
        user,
      },
    });
  }, [dispatch, user]);

  const _onRefresh = () => {
    dispatch({
      type: actions.GET_USER_GIFT,
      params: {
        user,
      },
    });
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const _keyExtractor = (_, index) => `MyGift-${index}`;

  const _renderItem = ({item}) => <ItemGift item={item} />;

  const _separator = () => <Block height={10} />;

  const _renderList = () => {
    if (isLoading && !refreshing) {
      return <MyGiftHolder />;
    }
    if (!data?.length) {
      return (
        <Empty
          lottie={lottie.gift}
          content={I18n.t('profileScreen.emptyGift')}
          imageStyles={styles.emptyGift}
        />
      );
    }
    return (
      <FlatList
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        ItemSeparatorComponent={_separator}
        refreshing={refreshing}
        onRefresh={_onRefresh}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList(bottom)}
      />
    );
  };

  return (
    <Block flex>
      <Header canGoBack title={I18n.t('profileScreen.gift')} />
      <Block flex padding={12}>
        {_renderList()}
      </Block>
      <Loading visible={isCheckGift} />
    </Block>
  );
};

export default MyGift;

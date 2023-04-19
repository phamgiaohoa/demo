import {icons} from '@assets';
import {Block, Text} from '@components';
import LoadMore from '@components/Common/LoadMore';
import {DeepLinkHolder} from '@components/Common/PlaceHolder';
import {routes} from '@navigation/routes';
import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/core';
import actions, {_onUnmount} from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import {CustomToast} from '@utils/helper';
import {getSize} from '@utils/responsive';
import {Buffer} from 'buffer';
import I18n from 'i18n';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  Share,
  TextInput,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
global.Buffer = Buffer;

const ListDeepLink = ({friendly_link}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [link, setLink] = useState(friendly_link || '');
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const {bottom} = useSafeAreaInsets();
  const user = useSelector(state => state.tokenUser.data);
  const {data, totalPage, isLoading} = useSelector(state => state.deepLink);

  useEffect(() => {
    dispatch({
      type: actions.GET_DEEP_LINK,
      params: {
        user,
        p: 1,
      },
    });

    return () => dispatch({type: _onUnmount(actions.GET_DEEP_LINK)});
  }, [dispatch, user]);

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    setPage(1);
    dispatch({
      type: actions.GET_DEEP_LINK,
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
        type: actions.GET_DEEP_LINK,
        isLoadMore: true,
        params: {
          user,
          p: page + 1,
        },
      });
    }
  };

  const _onAddLink = () => {
    if (!link) {
      return CustomToast('Vui lòng nhập đường link');
    }

    dispatch({
      type: actions.ADD_DEEP_LINK,
      params: {
        user,
      },
      body: {
        link_source: link,
      },
    });
  };

  const _onDeleteLink = id => {
    dispatch({
      type: actions.DELETE_DEEP_LINK,
      params: {
        user,
        id,
      },
    });
  };

  const _onClipboard = item_link => {
    Share.share({
      message: item_link,
    });
  };

  const _onLinkDetails = ({item_id, type, title}) => {
    if (type === 'detail') {
      navigation.navigate(routes.PRODUCT_DETAIL, {item_id});
    } else {
      navigation.navigate(routes.ALL_PRODUCT_SCREEN, {
        group_id: item_id,
        title: Buffer.from(title, 'base64').toString('utf8'),
      });
    }
  };

  const _copyCode = vlaue => {
    Clipboard.setString(vlaue);
    CustomToast(I18n.t('coupon.coppy'));
  };

  const _renderItem = ({item}) => {
    return (
      <Block>
        <Block paddingTop={20} radius={5} backgroundColor="white">
          <Block row alignCenter marginBottom={10} space="between">
            <Text flex fontType="heavy" numberOfLines={1}>
              {item.type === 'group'
                ? Buffer.from(item.title, 'base64').toString('utf8')
                : item.title}
            </Text>
            <Text size={12} fontType="light" color="placeholder">
              {moment(item.date_create * 1000).format('DD/MM/YYYY')}
            </Text>
          </Block>
          <Block row alignCenter space="between">
            <Block flex>
              <Pressable onPress={() => _onLinkDetails(item)}>
                <Text numberOfLines={2} color="blue">
                  {item.link_source}
                </Text>
              </Pressable>
            </Block>
            <Pressable onPress={() => _onClipboard(item?.link_source)}>
              <Image
                source={icons.copy}
                style={styles.iconCopy}
                resizeMode="contain"
              />
            </Pressable>
          </Block>
          <Block row alignCenter space="between">
            <Text fontType="semibold">Mã tiếp thị: </Text>
            <Pressable onPress={() => _copyCode(item.deeplink_code)}>
              <Block
                radius={5}
                paddingVertical={6}
                paddingHorizontal={10}
                backgroundColor="smoke">
                <Text size={13} color="blue">
                  {item.deeplink_code}
                </Text>
              </Block>
            </Pressable>
          </Block>
          <Block row alignCenter>
            <Image
              source={icons.click}
              style={styles.iconClick}
              resizeMode="contain"
            />
            <Text fontType="semibold">{item.num_view}</Text>
          </Block>
        </Block>
        <Pressable
          style={styles.btnDelete}
          onPress={() => _onDeleteLink(item.id)}>
          <Image
            source={icons.delete}
            style={styles.iconDelete}
            resizeMode="contain"
          />
        </Pressable>
      </Block>
    );
  };

  const _renderList = () => {
    if (!refreshing && isLoading && page === 1) {
      return <DeepLinkHolder />;
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
    <Block flex paddingHorizontal={12}>
      <Block row alignCenter marginVertical={10}>
        <TextInput
          value={link}
          onChangeText={text => setLink(text)}
          style={styles.input}
          placeholderTextColor={theme.colors.placeholder}
          placeholder="Nhập đường dẫn sản phẩm hoặc nhóm sản phẩm"
        />
        <Pressable style={styles.linkWrap} onPress={_onAddLink}>
          <Text color="white">Thêm link</Text>
        </Pressable>
      </Block>
      {_renderList()}
      {isLoading && page > 1 && <LoadMore />}
    </Block>
  );
};

export default ListDeepLink;

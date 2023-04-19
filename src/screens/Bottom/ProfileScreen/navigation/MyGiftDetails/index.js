import {icons} from '@assets';
import {AnimatedImage, Block, Text, ScrollView, Loading} from '@components';
import {MyGiftDetailsHolder} from '@components/Common/PlaceHolder';
import {goBack, navigate} from '@navigation/RootNavigation';
import {routes} from '@navigation/routes';
import actions from '@redux/actions';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import React, {useEffect} from 'react';
import {FlatList, Image, Pressable, StatusBar} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const MyGiftDetails = ({route}) => {
  const {item_id, picture, thumbnail, title, short, relativeTime} =
    route.params;

  const dispatch = useDispatch();
  const {top, bottom} = useSafeAreaInsets();
  const config = useSelector(state => state.config.data);
  const user = useSelector(state => state.tokenUser.data);
  const isConfirmGift = useSelector(state => state.confirmGift.isLoading);
  const {data, isLoading} = useSelector(state => state.giftDetails);

  useEffect(() => {
    dispatch({
      type: actions.GET_USER_GIFT_DETAILS,
      params: {
        user,
        item_id,
      },
    });
  }, [dispatch, item_id, user]);

  const _keyExtractor = (_, index) => `MyGiftDetails-${index}`;

  const _renderItem = ({item}) => {
    const _onAlertGift = () => {
      navigate(routes.ALERT_BOX, {
        title: I18n.t('cartScreen.titleModal'),
        content: I18n.t('profileScreen.confirmGift'),
        handleConfirm: _onTakeGift,
      });
    };

    const _onTakeGift = () => {
      dispatch({
        type: actions.CONFIRM_USER_GIFT,
        params: {
          user,
        },
        body: {
          promotion_id: item_id,
          gift_id: item.item_id,
        },
      });
    };

    return (
      <Pressable style={styles.itemWrap}>
        <AnimatedImage
          source={item.picture}
          thumbnail={item.thumbnail}
          style={styles.itemImage}
        />
        <Block flex marginTop={8}>
          <Text fontType="semibold">{item.title}</Text>
          {!!item.short && (
            <Text size={13} marginTop={5} color="placeholder">
              item.short
            </Text>
          )}
        </Block>
        <Pressable onPress={_onAlertGift} style={styles.itemBtn(config)}>
          <Text color="white">Nhận sản phẩm</Text>
        </Pressable>
      </Pressable>
    );
  };

  const _separator = () => <Block height={10} />;

  if (isLoading) {
    return <MyGiftDetailsHolder />;
  }

  return (
    <Block flex>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container(bottom)}>
        <Block>
          <Pressable style={styles.btnClose(top)} onPress={() => goBack()}>
            <Image style={styles.iconClose} source={icons.back} />
          </Pressable>
          <AnimatedImage
            source={picture}
            thumbnail={thumbnail}
            style={styles.banner(top)}
          />
          <Block padding={15} marginVertical={10} backgroundColor="white">
            <Text numberOfLines={1} size={16} fontType="heavy">
              {title}
            </Text>
            <Text marginTop={8} color="placeholder">
              {short}
            </Text>
          </Block>
          <Block
            row
            alignCenter
            padding={15}
            space="between"
            backgroundColor="white">
            <Text fontType="semibold">Thời gian còn lại:</Text>
            <CountDown
              until={relativeTime}
              onFinish={() => {}}
              timeToShow={['D', 'H', 'M', 'S']}
              timeLabels={{m: null, s: null}}
              showSeparator
              digitStyle={{
                backgroundColor: config.general_active_color,
                width: getSize.s(25),
                height: getSize.s(25),
              }}
              digitTxtStyle={{
                color: theme.colors.white,
                fontSize: getSize.m(14),
              }}
              separatorStyle={{
                color: config.general_active_color,
                fontSize: getSize.m(14),
              }}
            />
          </Block>
        </Block>
        <Block marginTop={10} marginHorizontal={12}>
          <FlatList
            data={data}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            ItemSeparatorComponent={_separator}
            columnWrapperStyle={styles.wrapper}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
          />
        </Block>
      </ScrollView>
      <Loading visible={isConfirmGift} />
    </Block>
  );
};

export default MyGiftDetails;

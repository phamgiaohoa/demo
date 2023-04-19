import {icons, lottie} from '@assets';
import {Block, Text} from '@components';
import LoadMore from '@components/Common/LoadMore';
import CommissionHolder from '@components/Common/PlaceHolder/CommissionHolder';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import I18n from 'i18n';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Pressable} from 'react-native';
import {Image} from 'react-native-elements/dist/image/Image';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ListCommission = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [check, setCheck] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dateBegin, setDateBegin] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const config = useSelector(state => state.config?.data);
  const user = useSelector(state => state.tokenUser.data);
  const {data, totalPage, isLoading} = useSelector(state => state.commission);

  useEffect(() => {
    dispatch({
      type: actions.GET_COMMISSION,
      params: {
        user,
        p: 1,
      },
    });
  }, [dispatch, user]);

  const _onConfirmDate = date => {
    if (check === 1) {
      setDateFrom(date);

      if (dateEnd >= date) {
        setDateBegin(date);

        dispatch({
          type: actions.GET_COMMISSION,
          params: {
            user,
            p: 1,
            search_date_begin: moment(date).format('DD/MM/YYYY'),
            search_date_end: moment(dateEnd).format('DD/MM/YYYY'),
          },
        });
      } else {
        Alert.alert(I18n.t('commission.error_begin'));
      }
    } else {
      setDateTo(date);
      if (dateBegin <= date) {
        setDateEnd(date);
        dispatch({
          type: actions.GET_COMMISSION,
          params: {
            user,
            p: 1,
            search_date_begin: moment(dateBegin).format('DD/MM/YYYY'),
            search_date_end: moment(date).format('DD/MM/YYYY'),
          },
        });
      } else {
        Alert.alert(I18n.t('commission.error_end'));
      }
    }
    setIsDatePicker(false);
    setCheck(0);
  };

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.GET_COMMISSION,
        isLoadMore: true,
        params: {
          user,
          p: page,
        },
      });
    }
  };

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);

    setDateEnd(new Date());
    setDateBegin(new Date());
    setPage(1);
    dispatch({
      type: actions.GET_COMMISSION,
      params: {
        user,
        p: 1,
      },
    });
  };

  const _renderEmpty = () => (
    <Empty
      lottie={lottie.commission}
      content={I18n.t('commission.empty')}
      contentMore={I18n.t('commission.emptyMore')}
    />
  );

  const _renderItem = ({item}) => (
    <Block
      radius={5}
      marginHorizontal={12}
      marginBottom={12}
      paddingHorizontal={12}
      paddingVertical={9}
      backgroundColor="white">
      <Block row alignCenter marginVertical={3} space="between">
        <Block row alignCenter>
          <Text fontType="semibold">{I18n.t('commission.buyer')}</Text>
          <Text>{item.o_full_name}</Text>
        </Block>
        <Text size={13} fontType="light" numberOfLines={1}>
          {moment(item.date_create * 1000).format('DD/MM/YYYY')}
        </Text>
      </Block>

      <Block row alignCenter marginVertical={3}>
        <Text fontType="semibold">{I18n.t('commission.order')}: </Text>
        <Text color={theme.colors.green}>
          {convertCurrency(item.total_order)}
        </Text>
        <Text> VNĐ</Text>
      </Block>

      <Block row alignCenter marginVertical={3} space="between">
        <Block row alignCenter marginVertical={3}>
          <Text fontType="semibold">
            {I18n.t('commission.commission_list')}
          </Text>
          <Text
            style={
              item.value_type === '1'
                ? {color: theme.colors.green}
                : {color: theme.colors.red}
            }>
            {convertCurrency(item.commission_add)}
          </Text>
          <Text> VNĐ</Text>
        </Block>
        <Menu>
          <MenuTrigger>
            <Image style={styles.iconInfo} source={icons.question} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.optionStyle}>
            <Block
              flex
              padding={12}
              radius={5}
              backgroundColor={theme.colors.placeholder}>
              <Text color="white">
                {item.recommend_link || 'Chưa có thành viên'}
              </Text>
            </Block>
          </MenuOptions>
        </Menu>
      </Block>
    </Block>
  );

  return (
    <Block flex backgroundColor={theme.colors.background}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[config?.general_active_color, config?.general_active_color]}>
        <Block row alignCenter space="between">
          <Pressable
            onPress={() => {
              setIsDatePicker(true);
              setCheck(1);
            }}>
            <Block marginLeft={16} paddingVertical={10}>
              <Text paddingVertical={6} color="white">
                {I18n.t('commission.date_begin')}
              </Text>
              <Text
                size={20}
                paddingVertical={6}
                color="white"
                fontType="semibold">
                {moment(dateBegin).format('DD-MM-YYYY')}
              </Text>
            </Block>
          </Pressable>
          <Image
            style={styles.image}
            source={icons.right_arrow}
            resizeMode="contain"
          />
          <Pressable
            onPress={() => {
              setIsDatePicker(true);
              setCheck(2);
            }}>
            <Block marginRight={16} paddingVertical={10}>
              <Text paddingVertical={6} color="white">
                {I18n.t('commission.date_end')}
              </Text>
              <Text
                size={20}
                paddingVertical={6}
                color="white"
                fontType="semibold">
                {moment(dateEnd).format('DD-MM-YYYY')}
              </Text>
            </Block>
          </Pressable>
        </Block>
      </LinearGradient>
      {isLoading && !data && <CommissionHolder />}
      {!isLoading && !data?.length ? (
        _renderEmpty()
      ) : (
        <Block flex paddingVertical={12}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => String(index)}
            renderItem={_renderItem}
            onEndReached={_loadMore}
            onRefresh={_onRefresh}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
          />
          {isLoading && page > 1 && <LoadMore />}
        </Block>
      )}
      <DateTimePickerModal
        mode="date"
        locale="vi_VN"
        date={check === 1 ? dateFrom : dateTo}
        headerTextIOS={check === 1 ? 'Chọn ngày bắt đầu' : 'Chọn ngày kết thúc'}
        isVisible={isDatePicker}
        onConfirm={_onConfirmDate}
        onCancel={() => setIsDatePicker(false)}
      />
    </Block>
  );
};

export default ListCommission;

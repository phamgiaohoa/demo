import {icons} from '@assets';
import {Block, Header, ModalBox, Text} from '@components';
import LoadMore from '@components/Common/LoadMore';
import {ProductHolder} from '@components/Common/PlaceHolder';
import actions from '@redux/actions';
import Empty from '@screens/Common/Empty';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {FlatList, SectionList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DiscountDetails from './components/DiscountDetails';
import ItemPromotion from './components/ItemPromotion';
import {convertData} from './helper';

// type = profile, payment

const DiscountManagement = ({route}) => {
  const {type} = route.params || {};
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [datadetails, setDatadetails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(state => state.tokenUser.data);
  const voucherProduct = useSelector(state => state.voucherProduct);
  const {data, totalPage, isLoading} = useSelector(state => state.discount);

  useEffect(() => {
    dispatch({
      type: actions.GET_DISCOUNT,
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
      type: actions.GET_DISCOUNT,
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
        type: actions.GET_DISCOUNT,
        isLoadMore: true,
        params: {
          user,
          p: page + 1,
        },
      });
    }
  };

  const _renderEmpty = () => (
    <Empty icon={icons.emptydiscount} content={I18n.t('coupon.promotions')} />
  );

  const _renderItem = ({item}) => {
    return (
      <ItemPromotion
        item={item}
        setIsVisible={setIsVisible}
        setDatadetails={setDatadetails}
      />
    );
  };

  const _renderSectionHeader = ({section: {title}}) => (
    <Text size={16}>{title}</Text>
  );

  const _renderSectionSeparator = () => <Block marginBottom={12} />;

  const _renderSeparator = () => <Block marginBottom={12} />;

  return (
    <Block flex backgroundColor="background">
      <Header canGoBack title={I18n.t('cart.coupon')} />
      {isLoading && !data && <ProductHolder />}
      {!isLoading && !data?.length ? (
        _renderEmpty()
      ) : (
        <Block flex isPaddingIos padding={12}>
          {type === 'payment' &&
          convertData(voucherProduct, data)?.length > 0 ? (
            <SectionList
              sections={convertData(voucherProduct, data)}
              keyExtractor={(_, index) => String(index)}
              renderItem={_renderItem}
              onEndReached={_loadMore}
              onEndReachedThreshold={0.5}
              refreshing={refreshing}
              onRefresh={_onRefresh}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              renderSectionHeader={_renderSectionHeader}
              SectionSeparatorComponent={_renderSectionSeparator}
              ItemSeparatorComponent={_renderSeparator}
            />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(_, index) => String(index)}
              renderItem={_renderItem}
              onEndReached={_loadMore}
              onEndReachedThreshold={0.5}
              refreshing={refreshing}
              onRefresh={_onRefresh}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              ItemSeparatorComponent={_renderSeparator}
            />
          )}

          {isLoading && page > 1 && <LoadMore />}
        </Block>
      )}
      <ModalBox
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}>
        <DiscountDetails
          setIsVisible={setIsVisible}
          datadetails={datadetails}
        />
      </ModalBox>
    </Block>
  );
};

export default DiscountManagement;

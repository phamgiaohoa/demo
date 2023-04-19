import {images} from '@assets';
import {Block, Header} from '@components';
import {HomeHolder} from '@components/Common/PlaceHolder';
import {routes} from '@navigation/routes';
import actions from '@redux/actions';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import CategoryGroup from './components/CategoryGroup';
import ProductCombo from './components/ProductCombo';
import ProductGroup from './components/ProductGroup';
import ProductShock from './components/ProductShock';
import SwipeBanner from './components/SwipeBanner';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadFirst, setIsLoadFirst] = useState(true);
  const [topActions, setTopActions] = useState(null);
  const {isFirstLaunching} = useSelector(state => state.general);
  const user = useSelector(state => state.tokenUser.data);
  const banner = useSelector(state => state.banner);
  const promotion = useSelector(state => state.promotion);
  const homeFocus = useSelector(state => state.homeFocus);
  const combo = useSelector(state => state.combo);
  const homeProduct = useSelector(state => state.homeProduct);

  const sizeBanner = top + 12 + 15 + 40 + getSize.s(35) + 12;
  const inputMax = topActions?.height + getSize.m(25) || 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: actions.IS_FIRST_LAUNCHING,
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    scrollY.addListener(() => {
      if (scrollY._value >= inputMax * 1.6) {
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
      }
    });
    const listenerBlur = navigation.addListener('blur', () => {
      StatusBar.setBarStyle('light-content');
    });
    const listenerFocus = navigation.addListener('focus', () => {
      if (scrollY._value >= inputMax * 1.6) {
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
      }
    });

    return () => {
      scrollY.removeAllListeners();
      listenerBlur();
      listenerFocus();
    };
  }, [inputMax, navigation, scrollY]);

  useEffect(() => {
    dispatch({
      type: actions.GET_BANNER,
    });
    dispatch({
      type: actions.GET_PROMOTION,
    });
    dispatch({
      type: actions.GET_HOME_FOCUS,
    });
    dispatch({
      type: actions.GET_COMBO,
    });
    dispatch({
      type: actions.GET_HOME_PRODUCT,
    });
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch({
        type: actions.GET_CART,
        params: {
          user,
        },
      });
      dispatch({
        type: actions.GET_COMBO_PRODUCT,
        params: {
          user,
          p: 1,
        },
      });
    }
  }, [dispatch, user, refreshing]);

  const _getIsHolder = () => {
    const isLoad =
      banner.isLoading ||
      promotion.isLoading ||
      homeFocus.isLoading ||
      combo.isLoading ||
      homeProduct.isLoading;

    return isLoadFirst && isLoad && isFirstLaunching;
  };

  const _onCart = () => navigation.navigate(routes.CART_SCREEN);

  const _onRefresh = useCallback(() => {
    setIsLoadFirst(false);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const _renderProductGroup = (item, index) => {
    return <ProductGroup key={index} productBy={item} />;
  };

  return (
    <Block flex backgroundColor="gackground">
      <ImageBackground
        style={styles.bannerHeader(sizeBanner)}
        source={images.banner_header}
      />
      <Block style={styles.contentWrap}>
        <Header
          type="home"
          scrollY={scrollY}
          inputMax={inputMax}
          onCart={_onCart}
        />
        {/* <CategoryGroup
          type="top"
          scrollY={scrollY}
          inputMax={inputMax}
          data={promotion.data}
          setTopActions={setTopActions}
        /> */}
        {_getIsHolder() ? (
          <HomeHolder />
        ) : (
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}
            refreshControl={
              <RefreshControl
                tintColor={theme.colors.white}
                refreshing={refreshing}
                onRefresh={_onRefresh}
              />
            }>
            <SwipeBanner
              type="top"
              scrollY={scrollY}
              topActions={topActions}
              banner={banner.data?.[0]}
            />
            <CategoryGroup
              scrollY={scrollY}
              inputMax={inputMax}
              data={promotion.data}
              setTopActions={setTopActions}
            />
            <SwipeBanner banner={banner.data?.[1]} />
            <ProductShock shocks={homeFocus.data} />
            <ProductCombo data={combo.data} />
            {homeProduct.data && homeProduct.data?.map(_renderProductGroup)}
          </Animated.ScrollView>
        )}
      </Block>
    </Block>
  );
};

export default HomeScreen;

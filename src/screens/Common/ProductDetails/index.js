import {Block} from '@components';
import {ProductDetailsHolder} from '@components/Common/PlaceHolder';
import actions, {_onUnmount} from '@redux/actions';
import {getSize, height} from '@utils/responsive';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ChooseBonus from './components//ChooseBonus';
import AnimatedCart from './components/AnimatedCart';
import AnimatedHeart from './components/AnimatedHeart';
import ChooseTypeProduct from './components/ChooseTypeProduct';
import ComboProduct from './components/ComboProduct';
import EvaluateProduct from './components/EvaluateProrduct';
import HeaderIcon from './components/HeaderIcon';
import ImageHeader from './components/ImageHeader';
import InfoProduct from './components/InfoProduct';
import InformationProduct from './components/InformationProduct';
import RelatedProduct from './components/RelatedProduct';
import VoucherProduct from './components/VoucherProduct';
import styles from './styles';

const MAX_HEIGHT = height - getSize.m(180);

const ProductDetails = ({route}) => {
  const {item_id, hasCombo, deeplink_code} = route.params;

  const dispatch = useDispatch();
  const [isHeart, setIsHeart] = useState();
  const [productBonus, setProductBonus] = useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedCart = useRef(new Animated.Value(0)).current;
  const animatedHeart = useRef(new Animated.Value(0)).current;

  const review = useSelector(state => state.review.data);
  const user = useSelector(state => state.tokenUser.data);
  const rProduct = useSelector(state => state.productDetails);
  const rCombo = useSelector(state => state.comboProductDetails);

  useEffect(() => {
    if (deeplink_code) {
      if (user) {
        dispatch({
          type: actions.ADD_USER_RECOMMEND,
          body: {deeplink_code},
          params: {user},
        });
      }
    }
  }, [deeplink_code, dispatch, user]);

  useEffect(() => {
    if (hasCombo) {
      dispatch({
        type: actions.GET_COMBO_PRODUCT_DETAILS,
        params: {
          user,
          item_id,
        },
      });
    }

    return () => {
      dispatch({type: _onUnmount(actions.GET_COMBO_PRODUCT_DETAILS)});
    };
  }, [dispatch, hasCombo, item_id, user]);

  useEffect(() => {
    if (!hasCombo) {
      dispatch({
        type: actions.GET_PRODUCT_DETAILS,
        params: {
          item_id,
        },
      });
      // dispatch({
      //   type: actions.GET_REVIEWS_PRODUCT,
      //   params: {
      //     item_id,
      //     p: 1,
      //   },
      // });
    }
    if (user) {
      dispatch({
        type: actions.ADD_PRODUCT_VIEWED,
        body: {
          item_id,
        },
        params: {
          user,
        },
      });
    }
    dispatch({
      type: actions.GET_REVIEWS_PRODUCT,
      params: {
        item_id,
        p: 1,
      },
    });
    return () => {
      dispatch({type: _onUnmount(actions.GET_PRODUCT_DETAILS)});
      dispatch({type: _onUnmount(actions.GET_REVIEWS_PRODUCT)});
      dispatch({type: _onUnmount(actions.ADD_PRODUCT_VIEWED)});
    };
  }, [dispatch, hasCombo, item_id, user]);

  const _onAnimatedCart = () => {
    if (animatedCart._value === 0) {
      Animated.timing(animatedCart, {
        toValue: MAX_HEIGHT,
        duration: 1000,
      }).start(({finished}) => {
        if (finished) {
          animatedCart.setValue(0);
        }
      });
    }
  };

  const _onAnimatedHeart = () => {
    if (animatedHeart._value === 0) {
      Animated.timing(animatedHeart, {
        toValue: 1,
        duration: 1000,
      }).start(({finished}) => {
        if (finished) {
          animatedHeart.setValue(0);
        }
      });
    }
  };

  const _renderContent = () => {
    if (rProduct.isLoading || rCombo.isLoading) {
      return <ProductDetailsHolder />;
    }

    const data = hasCombo ? rCombo.data : rProduct.data;

    return (
      <Block flex>
        <HeaderIcon
          scrollY={scrollY}
          title={data?.title}
          item_id={item_id}
          onSetAnimated={_onAnimatedHeart}
          setIsHeart={setIsHeart}
        />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}>
          <ImageHeader data={data?.arr_picture} />
          <InfoProduct data={data} />
          <VoucherProduct vouchers={data?.promotion_code} />
          {hasCombo && data?.combo && (
            <ChooseBonus
              data={data?.combo}
              productBonus={productBonus}
              setProductBonus={setProductBonus}
              containerStyles={styles.gifContainer}
            />
          )}
          {hasCombo && <ComboProduct data={data} />}
          <InformationProduct content={data?.content} isShowMore={!hasCombo} />
          <EvaluateProduct
            isShowAll
            hasCombo={hasCombo}
            data={review?.slice(0, 4)}
            item_id={item_id}
          />
          <RelatedProduct data={data?.arr_related} />
        </Animated.ScrollView>
        <ChooseTypeProduct
          productBonus={productBonus}
          hasCombo={hasCombo}
          isComBoGift={data?.combo?.arr_gift?.length > 0}
          onSetAnimated={_onAnimatedCart}
        />
        <AnimatedCart
          source={data?.arr_picture?.[0]}
          animatedValue={animatedCart}
        />
        <AnimatedHeart isHeart={isHeart} setIsHeart={setIsHeart} />
      </Block>
    );
  };

  return (
    <Block flex backgroundColor="background">
      <StatusBar translucent barStyle="dark-content" />
      {_renderContent()}
    </Block>
  );
};

export default ProductDetails;

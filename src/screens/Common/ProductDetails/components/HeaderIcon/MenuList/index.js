/* eslint-disable no-sequences */
import {icons} from '@assets';
import {Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import actions from '@redux/actions';
import {CustomToast} from '@utils/helper';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {Animated, Image, Share} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const MenuList = ({
  backgroundIcon,
  colorIcon,
  icon,
  item_id,
  onSetAnimated,
  setIsHeart,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.tokenUser.data);
  const userInfo = useSelector(state => state.userInfo.data);
  const favorite = useSelector(state => state.favoriteProduct.data);
  const productDetails = useSelector(state => state.productDetails.data);
  const data = favorite?.filter(function (item) {
    return item.item_id === item_id;
  });

  const [check, setCheck] = useState(
    user ? (data?.length === 0 ? true : false) : true,
  );

  useEffect(() => {
    user
      ? dispatch({
          type: actions.GET_SHOW_FAVORITE_PRODUCT,
          params: {
            user,
          },
        })
      : null;
  }, [dispatch, user]);

  const _onPress = () => {
    if (user) {
      dispatch({
        type: actions.CHECK_FAVORITE,
        body: {
          item_id,
          type: 'product',
        },
        check: true,
        params: {user},
      });
      check
        ? favorite.length === 12
          ? (CustomToast(I18n.t('productDetails.error')), setCheck(true))
          : (CustomToast(I18n.t('productDetails.like')),
            setIsHeart(check),
            setCheck(false))
        : (CustomToast(I18n.t('productDetails.noLike')), setCheck(true));
    } else {
      navigation.navigate(routes.ALERT_BOX, {
        title: I18n.t('productDetails.like'),
        content: I18n.t('productDetails.label'),
        handleConfirm,
      });
    }
  };

  const handleConfirm = () => {
    navigation.navigate(routes.BOTTOM_TAB, {screen: routes.PROFILE_SCREEN});
  };

  const _renderOption = (label, iconMenu, route, params) => (
    <MenuOption
      style={styles.row}
      onSelect={() => {
        navigation.navigate(route, params);
      }}>
      {iconMenu && (
        <Image source={iconMenu} style={styles.iconMenu} resizeMode="contain" />
      )}
      <Text size={13} color="white">
        {label}
      </Text>
    </MenuOption>
  );

  const _renderShare = () => (
    <MenuOption
      style={styles.row}
      onSelect={() =>
        Share.share({
          url: productDetails.friendly_link,
        })
      }>
      <Image
        source={icons.share}
        style={styles.iconMenu}
        resizeMode="contain"
      />
      <Text size={13} color="white">
        {I18n.t('productDetails.share')}
      </Text>
    </MenuOption>
  );

  const _renderFavorite = () => (
    <MenuOption style={styles.row} onSelect={_onPress}>
      {check ? (
        <Image
          source={icons.heart}
          style={styles.iconMenu}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={icons.heartCheck}
          resizeMode="contain"
          style={styles.iconMenu}
        />
      )}
      <Text color="white" size={13}>
        {I18n.t('productDetails.like')}
      </Text>
    </MenuOption>
  );

  return (
    <Menu>
      <MenuTrigger>
        <Animated.View
          style={{
            backgroundColor: backgroundIcon,
            ...styles.btnIcon,
          }}>
          <Animated.Image
            source={icon}
            resizeMode="contain"
            style={{tintColor: colorIcon, ...styles.icon}}
          />
        </Animated.View>
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.optionStyle}>
        <Block style={styles.shape} />
        <Block
          right={22}
          backgroundColor="#00000090"
          borderRadius={5}
          borderTopRightRadius={0}>
          <Block paddingHorizontal={6}>
            {_renderOption(
              I18n.t('productDetails.home_page'),
              icons.home,
              routes.HOME_SCREEN,
            )}
            {_renderOption(
              I18n.t('productDetails.portfolio'),
              icons.category,
              routes.CATEGORY_SCREEN,
            )}
            {_renderOption(
              I18n.t('productDetails.personal'),
              icons.user,
              routes.PROFILE_SCREEN,
            )}
            {_renderFavorite()}
            {_renderShare()}
            {userInfo?.is_request_affiliates === '1' &&
              userInfo?.is_affiliates === '1' &&
              _renderOption(
                I18n.t('productDetails.affiliate'),
                icons.copy,
                routes.ACCOUNT_AFFILIATE,
                productDetails?.friendly_link,
              )}
          </Block>
        </Block>
      </MenuOptions>
    </Menu>
  );
};

export default MenuList;

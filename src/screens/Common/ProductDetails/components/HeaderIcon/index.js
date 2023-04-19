import {icons} from '@assets';
import {Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import React from 'react';
import {Animated, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import MenuList from './MenuList';
import styles from './styles';

const HEIGHT = getSize.s(200);
const PressableAmin = Animated.createAnimatedComponent(Pressable);

const HeaderIcon = ({scrollY, title, item_id, onSetAnimated, setIsHeart}) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const cart = useSelector(state => state.cart.data);
  const config = useSelector(state => state.config?.data);

  const opacityBackground = scrollY.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const opacityTitle = scrollY.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const backgroundIcon = scrollY.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: [theme.colors.dark, theme.colors.white],
    extrapolate: 'clamp',
  });

  const colorIcon = scrollY.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: [theme.colors.white, theme.colors.black],
    extrapolate: 'clamp',
  });

  const _onGoBack = () =>
    navigation.canGoBack()
      ? navigation.goBack()
      : navigation.navigate(routes.BOTTOM_TAB);

  const _onMoveCart = () => navigation.navigate(routes.CART_SCREEN);

  const _renderIcon = (icon, onPress) => (
    <PressableAmin
      onPress={onPress}
      style={{
        backgroundColor: backgroundIcon,
        ...styles.btnIcon,
      }}>
      <Animated.Image
        source={icon}
        resizeMode="contain"
        style={{tintColor: colorIcon, ...styles.icon}}
      />
      {icon === icons.cart && (
        <Animated.View
          style={{
            backgroundColor: config.general_active_color,
            ...styles.textCart,
          }}>
          <Text color="white" size={10}>
            {cart?.length || 0}
          </Text>
        </Animated.View>
      )}
    </PressableAmin>
  );

  return (
    <Block style={styles.container}>
      <Animated.View
        style={{opacity: opacityBackground, ...styles.background}}
      />
      <Block row alignCenter space="between" marginTop={top}>
        {_renderIcon(icons.back, _onGoBack)}
        <Animated.View style={{opacity: opacityTitle, ...styles.titleWrap}}>
          <Text size={16} fontType="semibold" numberOfLines={1}>
            {title}
          </Text>
        </Animated.View>
        <Block row alignCenter>
          {_renderIcon(icons.cart, _onMoveCart)}
          <MenuList
            item_id={item_id}
            icon={icons.menu}
            backgroundIcon={backgroundIcon}
            colorIcon={colorIcon}
            onSetAnimated={onSetAnimated}
            setIsHeart={setIsHeart}
          />
        </Block>
      </Block>
      <Animated.View style={{opacity: opacityBackground, ...styles.shadow}} />
    </Block>
  );
};

export default HeaderIcon;

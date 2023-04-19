/* eslint-disable react-native/no-inline-styles */
import {icons} from '@assets';
import {Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {Animated, Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import styles from './styles';

const Header = props => {
  if (props.type === 'home') {
    return <HeaderHome {...props} />;
  }
  return <HeaderCommon {...props} />;
};

const HeaderHome = ({scrollY, inputMax}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart.data);

  const inputRange = [0, inputMax * 1.5, inputMax * 1.6];

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: getSize.m(12),
        paddingRight: getSize.m(20),
        paddingTop: top + 12,
        paddingBottom: getSize.m(15),
        backgroundColor: scrollY.interpolate({
          inputRange,
          outputRange: ['transparent', 'transparent', 'white'],
        }),
      }}>
      <Pressable onPress={() => navigation.navigate(routes.SEARCH_SCREEN)}>
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.8,
            height: 40,
            borderRadius: getSize.m(5),
            backgroundColor: scrollY.interpolate({
              inputRange: [0, inputMax * 1.5, inputMax * 1.6, inputMax * 3],
              outputRange: [
                'white',
                'white',
                theme.colors.smoke,
                theme.colors.smoke,
              ],
            }),
          }}>
          <Image
            source={icons.search}
            style={styles.icoSearch}
            resizeMode="contain"
          />
          <Text color={theme.colors.placeholder}>
            {I18n.t('header.search')}
          </Text>
        </Animated.View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate(routes.CART_SCREEN)}>
        <Animated.Image
          source={icons.cart_home}
          style={{
            ...styles.icoCart,
            tintColor: scrollY.interpolate({
              inputRange,
              outputRange: ['white', 'white', 'black'],
            }),
          }}
          resizeMode="contain"
        />
        <Block
          absolute
          justifyCenter
          alignCenter
          top={-8}
          right={-8}
          radius={20}
          width={20}
          height={20}
          padding={2}
          backgroundColor="lightRed">
          <Text size={11} color="white" fontType="bold">
            {cart?.length || 0}
          </Text>
        </Block>
      </Pressable>
    </Animated.View>
  );
};

const HeaderCommon = ({
  light,
  title,
  valueSearch,
  canGoBack,
  renderCart,
  renderSearch,
  onGoBack,
  onOptions,
}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const config = useSelector(state => state.config?.data);

  const _onBack = () => {
    onGoBack
      ? onGoBack()
      : navigation.canGoBack()
      ? navigation.goBack()
      : navigation.navigate(routes.BOTTOM_TAB);
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={
        light
          ? [theme.colors.white, theme.colors.white]
          : config?.general_background_color
      }>
      <Block
        row
        alignCenter
        paddingHorizontal={12}
        paddingTop={top + 10}
        paddingVertical={12}>
        {canGoBack && (
          <Pressable onPress={_onBack} style={styles.btnBack}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{
                ...styles.icoBack,
                tintColor: light ? theme.colors.black : theme.colors.white,
              }}
            />
          </Pressable>
        )}
        <Block flex alignCenter paddingHorizontal={30}>
          {renderSearch ? (
            <Search valueSearch={valueSearch} />
          ) : (
            <Text
              center
              size={16}
              fontType="semibold"
              color={light ? theme.colors.black : config.general_font_color}
              numberOfLines={2}
              style={{marginLeft: canGoBack && !renderCart ? -25 : 0}}>
              {title.toUpperCase()}
            </Text>
          )}
        </Block>
        {renderCart && <Cart />}
        {onOptions && <Options onOptions={onOptions} />}
      </Block>
    </LinearGradient>
  );
};

const Search = ({valueSearch}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(routes.SEARCH_SCREEN)}
      style={{...styles.search, width: width * 0.7}}>
      <Block row alignCenter height={40} radius={5} backgroundColor="white">
        <Image
          source={icons.search}
          style={styles.icoSearch}
          resizeMode="contain"
        />
        <Text color={theme.colors.placeholder}>
          {valueSearch || I18n.t('header.search')}
        </Text>
      </Block>
    </Pressable>
  );
};

const Cart = () => {
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart.data);
  const config = useSelector(state => state.config?.data);

  return (
    <Pressable onPress={() => navigation.navigate(routes.CART_SCREEN)}>
      <Image source={icons.cart} resizeMode="contain" style={styles.icoCart} />
      <Block
        absolute
        alignCenter
        top={-8}
        right={-5}
        radius={22}
        width={22}
        height={22}
        backgroundColor={config.general_active_color}>
        <Block
          justifyCenter
          alignCenter
          backgroundColor="yellow"
          radius={20}
          width={20}
          height={20}
          padding={2}>
          <Text fontType="bold" size={11}>
            {cart?.length || 0}
          </Text>
        </Block>
      </Block>
    </Pressable>
  );
};

const Options = ({onOptions}) => {
  return (
    <Pressable style={styles.btnOptions} onPress={onOptions}>
      <Image
        source={icons.more}
        resizeMode="contain"
        style={{
          ...styles.icoBack,
          tintColor: theme.colors.white,
        }}
      />
    </Pressable>
  );
};

export default Header;

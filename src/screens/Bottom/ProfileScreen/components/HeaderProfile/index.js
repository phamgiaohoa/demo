import {icons} from '@assets';
import {Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import {theme} from '@theme';
import I18n from 'i18n';
import React from 'react';
import {Animated, Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const PressableAmin = Animated.createAnimatedComponent(Pressable);

const HeaderProfile = ({scrollY, setIsVisible}) => {
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.userInfo.data);
  const config = useSelector(state => state.config.data);
  const URL_AVATAR =
    userInfo?.picture || 'https://reactnative.dev/img/tiny_logo.png';

  const _onPress = () => {
    navigation.navigate(routes.EDIT_PROFILE);
  };

  return (
    <Animated.View style={styles.container(scrollY)}>
      <PressableAmin style={styles.btnEdit(scrollY)} onPress={_onPress}>
        <Animated.Image
          style={styles.iconPencil(scrollY)}
          source={icons.pencil}
        />
      </PressableAmin>
      <Animated.View style={styles.avatarWrap(scrollY)}>
        <Pressable onPress={() => setIsVisible(true)}>
          <Block borderWidth={3} borderColor="smoke" radius={100}>
            <Animated.Image
              source={{uri: URL_AVATAR}}
              style={styles.avatar(scrollY)}
            />
          </Block>
          <Animated.View style={styles.imagePicker(scrollY)}>
            <Animated.Image
              source={icons.camera}
              style={styles.iconPicker(scrollY)}
              resizeMode="contain"
            />
          </Animated.View>
        </Pressable>
      </Animated.View>
      <Animated.View style={styles.bannerWrap(scrollY, config)}>
        <Image style={styles.banner} source={icons.wave} />
      </Animated.View>
      <Animated.View style={styles.infoWrap(scrollY)}>
        <Animated.View style={styles.avatarFake(scrollY)} />
        <Animated.View style={styles.textInfo(scrollY)}>
          <Text
            size={18}
            fontType="semibold"
            color={theme.colors.textBlack}
            numberOfLines={2}>
            {userInfo?.full_name || I18n.t('profileScreen.notUpdate')}
          </Text>
          <Text numberOfLines={1}>
            {userInfo?.email || I18n.t('profileScreen.notUpdate')}
          </Text>
        </Animated.View>
        <Animated.View style={styles.textInfo1(scrollY)}>
          <Text
            size={18}
            fontType="semibold"
            color={theme.colors.textBlack}
            numberOfLines={2}>
            {userInfo?.full_name || I18n.t('profileScreen.notUpdate')}
          </Text>
          <Text numberOfLines={1}>
            {userInfo?.email || I18n.t('profileScreen.notUpdate')}
          </Text>
        </Animated.View>
        <Animated.View style={styles.editFake(scrollY)} />
      </Animated.View>
    </Animated.View>
  );
};

export default HeaderProfile;

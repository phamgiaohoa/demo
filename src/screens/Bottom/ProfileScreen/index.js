/* eslint-disable react-native/no-inline-styles */
import {Block, Button, Text} from '@components';
import ImagePickerModal from '@components/Common/ImagePickerModal';
import {useImagePicker} from '@hooks';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import actions from '@redux/actions';
import {getSize} from '@utils/responsive';
import Storage from '@utils/storage';
import I18n from 'i18n';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, RefreshControl, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Delivery from './components/Delivery';
import HeaderProfile from './components/HeaderProfile';
import ItemProfile from './components/ItemProfile';
import ReferralCode from './components/ReferralCode';
import {GENERAL_LIST, MANAGER_LIST, SUPPORT_LIST} from './data';
import styles from './styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {picture, closeModal, openPicker, openCamera} = useImagePicker();
  const user = useSelector(state => state.tokenUser.data);
  const config = useSelector(state => state.config.data);
  const {isLoading} = useSelector(state => state.logOut);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  scrollY.addListener(({value}) => {
    if (value >= getSize.s(130)) {
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setBarStyle('light-content');
    }
  });

  useEffect(() => {
    dispatch({
      type: actions.GET_USER_GIFT,
      params: {
        user,
      },
    });
  }, [dispatch, user]);

  useEffect(() => {
    setIsVisible(false);
  }, [closeModal]);

  useEffect(() => {
    if (picture) {
      const formData = new FormData();
      formData.append('picture', picture);

      dispatch({
        type: actions.UPDATE_USER_INFORMATION,
        user,
        formData,
      });
    }
  }, [dispatch, picture, user]);

  const _onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);

    dispatch({
      type: actions.GET_ORDER,
      params: {
        user,
      },
    });

    dispatch({
      type: actions.GET_USER_INFORMATION,
      params: {
        user,
      },
    });
  }, [dispatch, user]);

  const _closeImagePickerModal = () => setIsVisible(false);

  const _handleLogOut = () => {
    Storage.getItem('TOKEN_USER').then(tokenUser => {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      dispatch({
        type: actions.LOGOUT_ACCOUNT,
        params: {
          user: tokenUser,
        },
      });
    });
  };

  const _renderItem = (item, index) => (
    <ItemProfile key={index} item={item} index={index} />
  );

  return (
    <Block flex backgroundColor="white">
      <Block flex>
        <Block height={130} />
        <HeaderProfile scrollY={scrollY} setIsVisible={setIsVisible} />
        <Animated.ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          refreshControl={
            <RefreshControl
              tintColor={config.general_active_color}
              refreshing={refreshing}
              onRefresh={_onRefresh}
              style={{zIndex: 999}}
            />
          }>
          <Block height={8} width="100%" backgroundColor="background" />
          <Delivery />
          <Block height={8} width="100%" backgroundColor="background" />
          {MANAGER_LIST.map(_renderItem)}
          <Block height={8} width="100%" backgroundColor="background" />
          {GENERAL_LIST.map(_renderItem)}
          <Block height={8} width="100%" backgroundColor="background" />
          {SUPPORT_LIST.map(_renderItem)}
          <Block height={8} width="100%" backgroundColor="background" />
          <ReferralCode />
          {/* <ChooseLanguage /> */}
          <Button
            style={styles.btnLogout}
            title={I18n.t('profileScreen.logout')}
            onPress={() => _handleLogOut()}
            disabled={isLoading}
          />
          {/* <Text center size={12} color="smoke" fontType="light">
            {I18n.t('profileScreen.version')}
          </Text>
          <Text center size={12} color="smoke" marginBottom={12}>
            {I18n.t('profileScreen.company')}
          </Text> */}
        </Animated.ScrollView>
      </Block>
      <ImagePickerModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onBackdropPress={_closeImagePickerModal}
        openPicker={openPicker}
        openCamera={openCamera}
      />
    </Block>
  );
};

export default ProfileScreen;

import {icons} from '@assets';
import {Block, RadioButton, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import Storage from '@utils/storage';
import I18n from 'i18n';
import React, {useEffect, useRef, useState} from 'react';
import {Image, Pressable} from 'react-native';
import RNRestart from 'react-native-restart';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';

const DATA = [
  {value: 'vi', label: 'Tiếng Việt'},
  {value: 'en', label: 'Tiếng Anh'},
];

const ChooseLanguage = ({position}) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const language = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);

  useEffect(() => {
    Storage.getItem('LANGUAGE').then(lang => setCurrentLanguage(lang || 'vi'));
  }, []);

  const _onSwitch = () => {
    const lang = currentLanguage === 'vi' ? 'en' : 'vi';
    _onChangeLanguage(lang);
  };

  const _onChangeLanguage = lang => {
    language.current = lang;
    navigation.navigate(routes.ALERT_BOX, {
      title: I18n.t('profileScreen.titleModal'),
      content: I18n.t('profileScreen.contentModal'),
      handleConfirm,
    });
  };

  const handleConfirm = () => {
    Storage.setItem('LANGUAGE', language.current);
    RNRestart.Restart();
  };

  if (!currentLanguage) {
    return null;
  }

  if (position === 'top') {
    return (
      <Pressable onPress={_onSwitch} style={styles.swipeChange(top)}>
        <Block
          radius={20}
          paddingVertical={5}
          paddingHorizontal={8}
          backgroundColor="dark">
          <Block row alignCenter>
            <Text color="white" fontType="semibold">
              {currentLanguage?.toUpperCase() ?? 'VI'}
            </Text>
            <Image
              style={styles.iconFlag}
              source={
                currentLanguage === 'vi' ? icons.vietnamese : icons.america
              }
              resizeMode="contain"
            />
          </Block>
        </Block>
      </Pressable>
    );
  }

  return (
    <Block
      row
      alignCenter
      paddingHorizontal={12}
      paddingVertical={16}
      space="between"
      style={styles.button}>
      <Block row alignCenter>
        <Image
          source={icons.translate}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text>{I18n.t('profileScreen.language')}</Text>
      </Block>
      <RadioButton
        data={DATA}
        setSelected={_onChangeLanguage}
        selected={currentLanguage}
      />
    </Block>
  );
};

export default ChooseLanguage;

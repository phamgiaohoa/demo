/* eslint-disable react-native/no-inline-styles */
import {Block, Text} from '@components';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const ButtonFilter = ({isInput, onBlur, onReset, onConfirm}) => {
  const config = useSelector(state => state.config.data);

  return isInput ? (
    <Pressable
      onPress={onBlur}
      style={{
        ...styles.filterButton,
        backgroundColor: config.general_active_color,
        marginHorizontal: getSize.m(15),
      }}>
      <Text size={16} fontType="semibold" color="white">
        {I18n.t('categoryScreen.accomplished')}
      </Text>
    </Pressable>
  ) : (
    <Block row alignCenter paddingHorizontal={15}>
      <Pressable
        onPress={onReset}
        style={{
          ...styles.filterButton,
          marginRight: getSize.m(10),
          backgroundColor: config.general_active_color,
        }}>
        <Text fontType="semibold" color="white">
          {I18n.t('categoryScreen.reset')}
        </Text>
      </Pressable>

      <Pressable
        style={{
          ...styles.filterButton,
          flex: 1,
          backgroundColor: theme.colors.orange,
        }}
        onPress={onConfirm}>
        <Text fontType="semibold" color="white">
          {I18n.t('categoryScreen.apply')}
        </Text>
      </Pressable>
    </Block>
  );
};

export default ButtonFilter;

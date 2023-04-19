import {icons} from '@assets';
import {Block, Text} from '@components';
import {useNavigation} from '@react-navigation/core';
import {CustomToastDev} from '@utils/helper';
import I18n from 'i18n';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';
import styles from './styles';

const ItemProfile = ({item, index}) => {
  const navigation = useNavigation();
  const gift = useSelector(state => state.gift.data);

  const _onPress = () => {
    item.navigation
      ? navigation.navigate(item.navigation, item.params)
      : CustomToastDev();
  };

  return (
    <Pressable key={index} style={styles.container(index)} onPress={_onPress}>
      <Block row alignCenter>
        <Image
          source={item.image}
          style={styles.iconLeft}
          resizeMode="contain"
        />
        <Text size={14}>{item.title}</Text>
      </Block>
      {item.title === I18n.t('profileScreen.gift') && gift?.length ? (
        <Badge
          value={gift?.length || 0}
          status="error"
          containerStyle={styles.badge}
        />
      ) : (
        <Image
          style={styles.iconRight}
          source={icons.right}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
};

export default ItemProfile;

import {icons} from '@assets';
import {Block, Text} from '@components';
import {theme} from '@theme';
import I18n from 'i18n';
import moment from 'moment';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const ItemPromotion = ({item, setIsVisible, setDatadetails}) => {
  return (
    <Pressable
      flexDirection="row"
      padding={10}
      backgroundColor="white"
      overflow="hidden"
      borderRadius={5}
      onPress={() => {
        setIsVisible(true);
        setDatadetails(item);
      }}>
      <Block width={80} height={70} alignCenter justifyCenter borderRadius={5}>
        <Image
          source={item.picture ? {uri: item.picture} : icons.discount}
          style={styles.image}
          resizeMode="contain"
        />
      </Block>
      <Block width={20} alignCenter>
        <Block
          height={70}
          width={1}
          borderRadius={1}
          borderWidth={1}
          space="between"
          borderColor="smoke"
          borderStyle="dashed"
        />
        <Block
          absolute
          top={-18}
          left={3}
          width={15}
          height={15}
          radius={30}
          backgroundColor="background"
        />
        <Block
          absolute
          bottom={-18}
          left={3}
          width={15}
          height={15}
          radius={30}
          backgroundColor="background"
        />
      </Block>
      <Block flex space="between">
        <Block>
          <Block row alignCenter space="between">
            <Text size={15} color={theme.colors.gray}>
              {item.promotion_id}
            </Text>
            <Image style={styles.iconInfo} source={icons.info} />
          </Block>
          <Text size={13} color={theme.colors.placeholder}>
            {I18n.t('coupon.remaining')}: {item.max_use}
          </Text>
        </Block>
        <Text size={13} color={theme.colors.placeholder}>
          {I18n.t('coupon.day_end')}:{' '}
          {moment(item.date_end * 1000).format('DD/MM/YYYY')}
        </Text>
      </Block>
    </Pressable>
  );
};

export default ItemPromotion;

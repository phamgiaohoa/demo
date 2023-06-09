import {icons} from '@assets';
import {Block, Text} from '@components';
import I18n from 'i18n';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import styles from './styles';

const Empty = ({
  icon,
  lottie,
  content,
  contentMore,
  onPress,
  style,
  imageStyles,
}) => {
  const config = useSelector(state => state.config.data);

  return (
    <Block flex alignCenter justifyCenter padding={12} style={style}>
      {lottie ? (
        <LottieView
          loop
          autoPlay
          source={lottie}
          style={[styles.lottie, imageStyles]}
        />
      ) : (
        <Image
          source={icon || icons.empty_list}
          style={styles.icon}
          resizeMode="contain"
        />
      )}
      <Text size={16}>{content || I18n.t('cart.empty')}</Text>
      {contentMore && (
        <Pressable onPress={onPress}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={config.general_background_color}
            style={styles.button}>
            <Text center color="white">
              {contentMore}
            </Text>
          </LinearGradient>
        </Pressable>
      )}
    </Block>
  );
};

export default Empty;

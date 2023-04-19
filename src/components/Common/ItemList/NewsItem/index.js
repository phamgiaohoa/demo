import {icons} from '@assets';
import {AnimatedImage, Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {width} from '@utils/responsive';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const NewsItem = ({item_id, thumbnail, image, title, short, date_update}) => {
  const navigation = useNavigation();

  return (
    <Block
      width={width}
      marginVertical={2}
      radius={5}
      backgroundColor="background">
      <Pressable
        backgroundColor="white"
        onPress={() =>
          navigation.navigate(routes.NEWS_DETAILS_SCREEN, {
            item_id,
          })
        }>
        <Block row alignCenter paddingVertical={10} marginHorizontal={12}>
          <AnimatedImage
            thumbnail={thumbnail}
            source={image}
            style={styles.imageStyle}
          />
          <Block flex>
            <Block marginLeft={8}>
              <Text fontType="semibold" numberOfLines={1}>
                {title}
              </Text>
              <Text size={13} marginTop={5} numberOfLines={2}>
                {short}
              </Text>
            </Block>
            <Block row alignCenter>
              <Image
                source={icons.calendar}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <Text marginTop={5} size={12} fontType="light">
                {date_update}
              </Text>
            </Block>
          </Block>
        </Block>
      </Pressable>
    </Block>
  );
};

export default NewsItem;

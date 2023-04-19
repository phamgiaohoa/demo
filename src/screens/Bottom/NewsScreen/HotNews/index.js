import {AnimatedImage, Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import {width} from '@utils/responsive';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import styles from './styles';

const HotNews = React.memo(({data}) => {
  const navigation = useNavigation();
  const [indexCur, setIndexCur] = useState(1);

  const _onChangeIndex = ({index}) => {
    setIndexCur(index + 1);
  };

  const _renderItem = ({item}) => {
    return (
      <Pressable
        width={width}
        backgroundColor="white"
        onPress={() =>
          navigation.navigate(routes.NEWS_DETAILS_SCREEN, {
            item_id: item.item_id,
          })
        }>
        <AnimatedImage
          thumbnail={item.thumbnail}
          source={item.picture}
          style={styles.image}
        />
        <Block paddingHorizontal={12}>
          <Block paddingVertical={8}>
            <Text fontType="semibold" numberOfLines={2}>
              {item.title}
            </Text>
            <Text size={13} marginTop={5} numberOfLines={2}>
              {item.short}
            </Text>
          </Block>
        </Block>
      </Pressable>
    );
  };

  const _renderPagination = () => {
    return (
      <Block absolute right={0} padding={6}>
        <Block
          alignCenter
          justifyCenter
          radius={6}
          margin={6}
          paddingHorizontal={8}
          paddingVertical={4}
          backgroundColor="#00000060">
          <Text size={12} color="white" fontType="bold">
            {indexCur} / {data?.length || 0}
          </Text>
        </Block>
      </Block>
    );
  };

  return (
    <SwiperFlatList
      autoplay
      autoplayLoop
      showPagination
      data={data}
      renderItem={_renderItem}
      PaginationComponent={_renderPagination}
      onChangeIndex={_onChangeIndex}
    />
  );
});

export default HotNews;

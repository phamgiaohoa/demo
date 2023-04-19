import {AnimatedImage} from '@components';
import {getSize} from '@utils/responsive';
import React from 'react';
import {Animated, Dimensions} from 'react-native';
import {Pagination, SwiperFlatList} from 'react-native-swiper-flatlist';
import styles from './styles';

const {width} = Dimensions.get('window');

const SwipeBanner = ({banner = [], type, topActions, scrollY}) => {
  const inputMax = topActions?.height + getSize.m(20) || 1;

  const _getOpacity = () => {
    if (type === 'top') {
      return scrollY.interpolate({
        inputRange: [0, inputMax],
        outputRange: [1, 0],
      });
    } else {
      return 1;
    }
  };

  const _renderItem = ({item}) => {
    return (
      <AnimatedImage
        style={{width: width - 24, height: getSize.s(120)}}
        source={item?.img_link}
        thumbnail={item?.img_link}
      />
    );
  };

  const _renderPagination = rest => {
    return (
      <Pagination
        {...rest}
        paginationStyle={styles.dotContainer}
        paginationStyleItem={styles.dotItem}
        paginationDefaultColor="white"
        paginationActiveColor="tomato"
      />
    );
  };

  if (!banner?.length) {
    return null;
  }

  return (
    <Animated.View
      style={{
        paddingHorizontal: getSize.m(12),
        marginVertical: getSize.m(12),
        height: getSize.s(120),
        opacity: _getOpacity(),
      }}>
      <SwiperFlatList
        autoplay
        autoplayLoop
        showPagination
        data={banner}
        renderItem={_renderItem}
        PaginationComponent={_renderPagination}
      />
    </Animated.View>
  );
};

export default SwipeBanner;

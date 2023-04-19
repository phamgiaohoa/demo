import Block from '@components/Block';
import {height} from '@utils/responsive';
import React, {useRef} from 'react';
import {Animated, Easing} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DATA from './data';
import styles from './styles';

const MAX_HEIGHT = Math.ceil(height * 0.8);

const HeartContainer = ({style, time, isHeart, setIsHeart}) => {
  const position = useRef(new Animated.Value(0)).current;

  const animation = position.interpolate({
    inputRange: [-MAX_HEIGHT, 0],
    outputRange: [MAX_HEIGHT, 0],
  });

  const opacityAnimation = animation.interpolate({
    inputRange: [0, 10, MAX_HEIGHT, MAX_HEIGHT],
    outputRange: [1, 0.8, 0.5, 0],
  });

  const scaleAnimation = animation.interpolate({
    inputRange: [0, 15, MAX_HEIGHT],
    outputRange: [0, 1.4, 0],
    extrapolate: 'clamp',
  });

  const xAnimation = animation.interpolate({
    inputRange: [0, MAX_HEIGHT / 6, MAX_HEIGHT / 3, MAX_HEIGHT / 2, MAX_HEIGHT],
    outputRange: [0, 25, 15, 0, 10],
  });

  if (isHeart) {
    Animated.timing(position, {
      duration: time,
      toValue: -MAX_HEIGHT,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        position.setValue(0);
        setIsHeart(!isHeart);
      }
    });
  }

  const getHeartStyle = () => {
    return {
      transform: [
        {translateY: position},
        {scale: scaleAnimation},
        {translateX: xAnimation},
      ],
      opacity: opacityAnimation,
    };
  };

  return (
    <Animated.View style={[styles.heartContainer, getHeartStyle(), style]}>
      <AntDesign type="AntDesign" name="heart" size={30} color={'red'} />
    </Animated.View>
  );
};

const AnimatedHeart = ({isHeart, setIsHeart}) => {
  return (
    <Block flex pointerEvents="none">
      {DATA?.map((heart, index) => {
        return (
          <HeartContainer
            key={index}
            style={{right: heart.right}}
            time={heart.duration}
            isHeart={isHeart}
            setIsHeart={setIsHeart}
          />
        );
      })}
    </Block>
  );
};

export default AnimatedHeart;

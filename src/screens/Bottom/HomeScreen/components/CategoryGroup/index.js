/* eslint-disable react-native/no-inline-styles */
import {Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {getSize, width} from '@utils/responsive';
import React, {useState} from 'react';
import {Animated, Image, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';

const CategoryGroup = ({type, scrollY, inputMax, data = [], setTopActions}) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [toggleEvent, setToggleEvent] = useState(false);

  scrollY.addListener(() => {
    if (scrollY._value >= inputMax * 1.6) {
      !toggleEvent && setToggleEvent(true);
    } else {
      toggleEvent && setToggleEvent(false);
    }
  });

  const inputRange = [0, inputMax * 1.5, inputMax * 1.6];

  const _getStyles = () => {
    if (type === 'top') {
      return {
        ...styles.topMenu,
        top: top + 12 + 40 + getSize.m(15),
        opacity: scrollY.interpolate({
          inputRange,
          outputRange: [0, 0, 1],
        }),
      };
    } else {
      return {
        marginVertical: getSize.m(12),
        opacity: scrollY.interpolate({
          inputRange,
          outputRange: [1, 0.5, 0],
        }),
      };
    }
  };

  const _getPointEvent = () => {
    if (!toggleEvent && type === 'top') {
      return 'none';
    } else {
      return 'auto';
    }
  };

  const _onLayout = e => {
    setTopActions(e.nativeEvent.layout);
  };

  const _onPress = item =>
    navigation.navigate(routes.CATEGORY_DETAIL, {
      title: item.title,
      apply_group: item.apply_group,
    });

  const _renderItem = (item, index) => {
    return (
      <Pressable onPress={() => _onPress(item)} key={index}>
        <Block alignCenter width={width / 4} marginBottom={16}>
          <Image
            source={{uri: item.icon}}
            style={{
              ...styles.icon,
              marginBottom: type === 'top' ? 0 : getSize.m(5),
            }}
            resizeMode="contain"
          />
          {type !== 'top' && (
            <Text center numberOfLines={2} size={12} marginHorizontal={12}>
              {item.title}
            </Text>
          )}
        </Block>
      </Pressable>
    );
  };

  if (!data?.length) {
    return null;
  }

  return (
    <Animated.View
      style={{
        ..._getStyles(),
        ...styles.container,
      }}
      pointerEvents={_getPointEvent()}
      onLayout={_onLayout}>
      {data?.map(_renderItem)}
    </Animated.View>
  );
};

export default CategoryGroup;

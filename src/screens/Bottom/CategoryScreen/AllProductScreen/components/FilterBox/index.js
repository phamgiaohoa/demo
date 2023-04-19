import {icons} from '@assets';
import {Block, Text} from '@components';
import {theme} from '@theme';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const FilterBox = ({label, data, itemSelect, isIcon, onPress}) => {
  const config = useSelector(state => state.config.data);

  return (
    <Block padding={15}>
      <Text marginBottom={10} size={15} fontType="semibold">
        {label}
      </Text>

      <Block row wrap alignCenter justifyCenter>
        {data?.map((item, index) => {
          const color =
            itemSelect === index
              ? config.general_font_color
              : theme.colors.black;
          const backgroundColor =
            itemSelect === index
              ? config.general_active_color
              : theme.colors.smoke;

          return (
            <Pressable
              key={index}
              style={{...styles.btnStar, backgroundColor}}
              onPress={() => onPress(item, index)}>
              {isIcon && (
                <Image
                  style={styles.iconStar}
                  source={icons.star}
                  resizeMode="contain"
                />
              )}
              <Text style={{color}}>{item.title}</Text>
            </Pressable>
          );
        })}
      </Block>
    </Block>
  );
};

export default FilterBox;

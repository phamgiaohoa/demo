import {Block} from '@components';
import React from 'react';
import {FlatList, Pressable, Text} from 'react-native';

const CustomContent = ({data, onPress}) => {
  const _renderItem = ({item}) => {
    return (
      <Pressable onPress={() => onPress(item)}>
        <Block padding={15}>
          <Text>{item.title}</Text>
        </Block>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => String(index)}
      renderItem={_renderItem}
    />
  );
};

export default CustomContent;

import {Block, Shimmer} from '@components';
import {width} from '@utils/responsive';
import React from 'react';
import {FlatList} from 'react-native';

const CategoryHolder = () => {
  const _renderLeft = () => {
    return (
      <Shimmer
        width={width * 0.25 - 12}
        height={width * 0.25 - 12}
        marginTop={10}
        marginLeft={12}
        marginBottom={0}
      />
    );
  };
  const _renderRight = () => {
    return (
      <Shimmer
        width={width * 0.75 - 20}
        height={50}
        marginTop={10}
        marginLeft={8}
        marginRight={8}
        marginBottom={0}
      />
    );
  };

  return (
    <Block flex row backgroundColor="white">
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        keyExtractor={(_, index) => String(index)}
        renderItem={_renderLeft}
        showsVerticalScrollIndicator={false}
      />
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        keyExtractor={(_, index) => String(index)}
        renderItem={_renderRight}
        showsVerticalScrollIndicator={false}
      />
    </Block>
  );
};

export default CategoryHolder;

import {Block, Shimmer} from '@components';
import React from 'react';
import {FlatList} from 'react-native';

const PointHolder = () => {
  const _renderItem = () => {
    return (
      <Block backgroundColor="white" padding={12} radius={8}>
        <Block row alignCenter space="between">
          <Shimmer width={150} />
          <Shimmer width={80} />
        </Block>
        <Shimmer width={200} />
        <Shimmer width={150} />
        <Shimmer width={170} />
        <Shimmer width={190} marginBottom={0} />
      </Block>
    );
  };

  return (
    <FlatList
      data={[1, 1, 1, 1, 1, 1, 1]}
      keyExtractor={(_, index) => String(index)}
      renderItem={_renderItem}
      ItemSeparatorComponent={() => <Block height={10} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PointHolder;

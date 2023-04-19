import {Block, Shimmer} from '@components';
import React from 'react';
import {FlatList} from 'react-native';

const OrderHolder = () => {
  const _renderItem = () => {
    return (
      <Block backgroundColor="white" padding={12} radius={8}>
        <Block row alignCenter space="between">
          <Shimmer width={150} />
          <Shimmer width={80} />
        </Block>
        <Block row alignCenter space="between">
          <Shimmer width={100} />
          <Shimmer width={70} />
        </Block>
        <Block row alignCenter marginTop={8} space="between">
          <Shimmer width={80} marginBottom={0} />
          <Shimmer width={50} marginBottom={0} />
        </Block>
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

export default OrderHolder;

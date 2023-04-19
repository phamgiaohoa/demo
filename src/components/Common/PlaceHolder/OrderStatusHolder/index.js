import {Block, Shimmer} from '@components';
import React from 'react';
import {FlatList} from 'react-native';

const OrderStatusHolder = () => {
  const _renderItem = () => {
    return (
      <Block alignCenter width={80} marginHorizontal={10}>
        <Shimmer width={60} height={60} radius={60} />
        <Shimmer width={80} marginBottom={0} />
      </Block>
    );
  };

  return (
    <Block padding={12}>
      <Block row alignCenter space="between" marginBottom={22}>
        <Shimmer width={150} height={20} marginBottom={0} />
        <Shimmer width={80} height={20} marginBottom={0} />
      </Block>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 1, 1, 1, 1, 1, 1]}
        keyExtractor={(_, index) => String(index)}
        renderItem={_renderItem}
      />
    </Block>
  );
};

export default OrderStatusHolder;

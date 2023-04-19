/* eslint-disable react-native/no-inline-styles */
import {Block, Shimmer} from '@components';
import {width} from '@utils/responsive';
import React from 'react';
import {FlatList} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ListHolder = () => {
  const _keyExtractor = (_, index) => String(index);

  const _renderItem = () => {
    return <Shimmer width={(width - 34) / 2} height={250} />;
  };

  return (
    <Block>
      <FlatList
        numColumns={2}
        data={DATA}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
      />
    </Block>
  );
};

export default ListHolder;

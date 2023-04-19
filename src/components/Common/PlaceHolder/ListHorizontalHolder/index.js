import {Block, Shimmer} from '@components';
import {width} from '@utils/responsive';
import React from 'react';
import {ScrollView} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ListHorizontalHolder = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {DATA.map((_, index) => (
        <Block
          key={`ListHorizontalHolder-${index}`}
          row
          alignCenter
          space="between"
          radius={5}
          padding={10}
          marginHorizontal={12}
          marginTop={index === 0 ? 0 : 15}
          backgroundColor="white">
          <Shimmer width={100} height={100} marginBottom={0} />
          <Shimmer
            width={width - 24 - 10 - 100 - 20}
            height={100}
            marginBottom={0}
          />
        </Block>
      ))}
    </ScrollView>
  );
};

export default ListHorizontalHolder;

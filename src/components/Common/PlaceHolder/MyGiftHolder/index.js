import {Block, Shimmer} from '@components';
import {width} from '@utils/responsive';
import React from 'react';
import {ScrollView} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MyGiftHolder = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {DATA.map((_, index) => (
        <Block
          key={index}
          padding={10}
          radius={5}
          marginTop={index !== 0 ? 10 : 0}
          backgroundColor="white">
          <Shimmer width={width - 24 - 20} height={200} marginBottom={0} />
          <Shimmer
            width={width - 24 - 20}
            height={80}
            marginTop={15}
            marginBottom={15}
          />
          <Block row alignCenter space="between">
            <Shimmer width={80} height={25} marginBottom={0} />
            <Shimmer width={100} height={25} marginBottom={0} />
          </Block>
        </Block>
      ))}
    </ScrollView>
  );
};

export default MyGiftHolder;

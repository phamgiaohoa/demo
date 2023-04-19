import {Shimmer} from '@components';
import Block from '@components/Block';
import {width} from '@utils/responsive';
import React from 'react';
import {ScrollView} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DeepLinkHolder = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {DATA.map((item, index) => (
        <Block
          key={index}
          padding={8}
          radius={5}
          backgroundColor="background"
          marginTop={index !== 0 ? 10 : 0}>
          <Block row alignCenter marginBottom={10} space="between">
            <Shimmer width={150} marginBottom={0} />
            <Shimmer width={80} marginBottom={0} />
          </Block>
          <Shimmer width={width - 24 - 16} height={25} marginBottom={10} />
          <Shimmer width={80} height={25} marginBottom={0} />
        </Block>
      ))}
    </ScrollView>
  );
};

export default DeepLinkHolder;

import {Shimmer} from '@components';
import Block from '@components/Block';
import {width} from '@utils/responsive';
import React from 'react';
import {ScrollView} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductHolder = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {DATA.map((item, index) => (
        <Block key={index} row alignCenter space="between" padding={12}>
          <Shimmer width={80} height={90} />
          <Shimmer width={width - 24 - 80 - 12} height={90} />
        </Block>
      ))}
    </ScrollView>
  );
};

export default ProductHolder;

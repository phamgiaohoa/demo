import {Block, Shimmer} from '@components';
import {height, width} from '@utils/responsive';
import React from 'react';
import {ScrollView} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const NewsHolder = () => {
  return (
    <Block backgroundColor="white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Shimmer height={height / 5} />
        {DATA.map((item, index) => (
          <Block
            key={index}
            row
            alignCenter
            space="between"
            marginTop={5}
            paddingHorizontal={12}>
            <Shimmer width={80} height={80} />
            <Shimmer width={width - 120} height={width * 0.2} />
          </Block>
        ))}
      </ScrollView>
    </Block>
  );
};

export default NewsHolder;

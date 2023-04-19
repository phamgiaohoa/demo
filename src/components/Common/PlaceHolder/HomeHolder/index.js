import {Block, Shimmer} from '@components';
import {width} from '@utils/responsive';
import React from 'react';
import {ScrollView} from 'react-native';

const DATA = [1, 2, 3, 4];

const HomeHolder = () => {
  return (
    <Block flex padding={12}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Shimmer width={width - 24} height={120} marginBottom={10} />
        <Block row wrap space="between" alignCenter marginBottom={10}>
          {DATA.map((_, index) => (
            <Shimmer
              key={index}
              width={(width - 6 * 12) / 4}
              height={60}
              marginBottom={10}
            />
          ))}
        </Block>
        <Shimmer width={width - 24} height={120} marginBottom={16} />
        <Block row alignCenter space="between">
          <Shimmer width={100} height={15} />
          <Shimmer width={60} height={15} />
        </Block>
        <Block row alignCenter space="between">
          <Shimmer width={(width - 34) / 2} height={250} />
          <Shimmer width={(width - 34) / 2} height={250} />
        </Block>
        <Block row alignCenter marginTop={16} space="between">
          <Shimmer width={100} height={15} />
          <Shimmer width={60} height={15} />
        </Block>
        <Block row alignCenter space="between">
          <Shimmer width={(width - 34) / 1.5} height={250} />
          <Shimmer width={(width - 34) / 3} height={250} />
        </Block>
      </ScrollView>
    </Block>
  );
};

export default HomeHolder;

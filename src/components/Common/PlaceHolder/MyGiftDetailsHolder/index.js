import {Block, Shimmer} from '@components';
import {width} from '@utils/responsive';
import React from 'react';
import {ScrollView} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6];

const MyGiftDetailsHolder = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Shimmer width={width} height={300} marginBottom={0} />
      <Shimmer width={width} height={200} marginTop={15} marginBottom={15} />
      <Shimmer width={width} height={50} marginBottom={15} />

      <Block row wrap space="between" paddingHorizontal={12}>
        {DATA.map((_, index) => (
          <Shimmer
            key={`MyGiftDetailsHolder-${index}`}
            width={width / 2 - 6 - 12}
            height={200}
            marginBottom={10}
          />
        ))}
      </Block>
    </ScrollView>
  );
};

export default MyGiftDetailsHolder;

import {Block, Shimmer} from '@components';
import {height, width} from '@utils/responsive';
import React from 'react';
import {ScrollView} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6, 7];

const UserRatingHolder = () => {
  return (
    <Block padding={12}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {DATA.map((item, index) => (
          <Block key={index} row wrap space="between" marginBottom={10}>
            <Shimmer width={70} height={70} radius={70} marginBottom={0} />
            <Shimmer
              width={width - 70 - 34}
              height={height / 8}
              marginBottom={0}
            />
          </Block>
        ))}
      </ScrollView>
    </Block>
  );
};

export default UserRatingHolder;

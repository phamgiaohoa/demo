import {Shimmer} from '@components';
import {getSize} from '@utils/responsive';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const GroupSubHolder = () => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}>
      {DATA.map((_, index) => (
        <Shimmer
          key={index}
          width={150}
          height={40}
          marginLeft={index === 0 ? 0 : 10}
          radius={50}
          marginBottom={0}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getSize.m(12),
  },
});

export default GroupSubHolder;

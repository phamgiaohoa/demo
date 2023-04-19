import {Block, Shimmer} from '@components';
import {width} from '@utils/responsive';
import React from 'react';
import {Platform, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ProductDetailsHolder = () => {
  const {bottom} = useSafeAreaInsets();

  return (
    <Block flex paddingBottom={Platform.OS === 'ios' ? bottom : 12}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Shimmer height={width} marginBottom={0} />
        <Block backgroundColor="white" padding={12}>
          <Shimmer width={width - 24} marginBottom={10} />
          <Shimmer width={150} height={20} marginBottom={10} />
          <Shimmer width={250} height={20} marginBottom={0} />
        </Block>
        <Block backgroundColor="white" padding={12} marginTop={10}>
          <Shimmer width={width - 24} marginBottom={0} />
        </Block>
        <Block backgroundColor="white" marginTop={10} padding={12}>
          <Shimmer width={150} height={20} marginBottom={20} />
          <Shimmer width={width - 24} marginBottom={10} />
          <Shimmer width={width - 24} height={300} marginTop={5} />
        </Block>
        <Block backgroundColor="white" marginTop={12} padding={12}>
          <Shimmer width={width - 24} height={100} marginBottom={10} />
          <Shimmer width={width - 24} height={200} />
        </Block>
      </ScrollView>
    </Block>
  );
};

export default ProductDetailsHolder;

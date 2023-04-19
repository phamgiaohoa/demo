import {Block, Text} from '@components';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import styles from './styles';

const ImageHeader = ({data}) => {
  const [indexCur, setIndexCur] = useState(1);

  const _onChangeIndex = ({index}) => {
    setIndexCur(index + 1);
  };

  const _renderItem = ({item}) => {
    return <Image source={{uri: item}} style={styles.image} />;
  };

  const _renderPagination = () => (
    <Block style={styles.paginationContainer}>
      <Block
        alignCenter
        justifyCenter
        paddingHorizontal={8}
        paddingVertical={4}
        radius={6}
        margin={6}
        backgroundColor="#00000060">
        <Text size={12} color="white" fontType="bold">
          {indexCur} / {data?.length || 0}
        </Text>
      </Block>
    </Block>
  );

  return (
    <Block>
      <SwiperFlatList
        showPagination
        data={data}
        renderItem={_renderItem}
        PaginationComponent={_renderPagination}
        onChangeIndex={_onChangeIndex}
      />
    </Block>
  );
};

export default ImageHeader;

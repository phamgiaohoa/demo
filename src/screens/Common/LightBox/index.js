import {icons} from '@assets';
import {Block, Text} from '@components';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, StatusBar} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import styles from './styles';

const LightBox = ({route}) => {
  const navigation = useNavigation();
  const [indexCur, setIndexCur] = useState(1);
  const {images = []} = route.params || {};

  const _onChangeIndex = ({index}) => {
    setIndexCur(index + 1);
  };

  const _renderItem = ({item}) => {
    return (
      <Block flex justifyCenter alignCenter>
        <Image source={{uri: item}} style={styles.image} />
      </Block>
    );
  };

  const _renderPagination = () => (
    <Block justifyCenter alignCenter>
      <Text size={12} marginBottom={30} color="white" fontType="bold">
        {indexCur} / {images?.length || 0}
      </Text>
    </Block>
  );

  return (
    <Block flex paddingTop={50} backgroundColor="black">
      <StatusBar translucent barStyle="light-content" />
      <Pressable onPress={() => navigation.goBack()}>
        <Block
          alignCenter
          justifyCenter
          width={30}
          height={30}
          radius={30}
          marginHorizontal={20}
          backgroundColor="white">
          <Image
            source={icons.close}
            resizeMode="contain"
            style={styles.icoClose}
          />
        </Block>
      </Pressable>
      <SwiperFlatList
        showPagination
        data={images}
        renderItem={_renderItem}
        PaginationComponent={_renderPagination}
        onChangeIndex={_onChangeIndex}
      />
    </Block>
  );
};

export default LightBox;

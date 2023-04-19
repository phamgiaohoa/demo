import {Block, Text} from '@components';
import Rating from '@components/Common/Rating';
import moment from 'moment';
import React from 'react';

const Comment = ({item}) => {
  // const navigation = useNavigation();

  // const _listImage = (uri, i) => {
  //   return (
  //     <Pressable
  //       key={i}
  //       marginRight={5}
  //       onPress={() =>
  //         navigation.navigate(routes.LIGHT_BOX, {
  //           images: item.picture,
  //         })
  //       }>
  //       <Image source={{uri}} style={styles.imageRating} />
  //     </Pressable>
  //   );
  // };

  if (!item.full_name) {
    return null;
  }

  return (
    <Block marginVertical={8} paddingHorizontal={8} backgroundColor="white">
      <Block row>
        <Block
          justifyCenter
          alignCenter
          height={50}
          width={50}
          borderRadius={32}
          backgroundColor="smoke">
          <Text size={12}>{item?.avatar?.toUpperCase()}</Text>
        </Block>
        <Block flex marginLeft={16}>
          <Block row alignCenter marginBottom={3} space="between">
            <Text fontType="semibold">{item.full_name}</Text>
            <Text size={11} color="placeholder">
              {moment(parseInt(item.date_create, 10) * 1000).format(
                'DD/MM/YYYY',
              )}
            </Text>
          </Block>
          <Rating imageSize={11} startingValue={parseInt(item.rate, 10)} />
          <Text marginVertical={6}>{item.content} </Text>
          {/* {!!item.picture && (
            <Block row wrap>
              {item.picture.map(_listImage)}
            </Block>
          )} */}
        </Block>
      </Block>
    </Block>
  );
};

export default Comment;

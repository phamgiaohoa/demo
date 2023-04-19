import {Block, Text} from '@components';
import {theme} from '@theme';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const LeftBox = ({setParentId, setTitle}) => {
  const [active, setActive] = useState(null);
  const config = useSelector(state => state.config.data);
  const category = useSelector(state => state.category.data);

  useEffect(() => {
    if (category?.length) {
      setActive(category[0].group_id);
      setParentId(category[0].group_id);
      setTitle(category[0].title);
    }
  }, [category, setParentId, setTitle]);

  const _renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          setActive(item.group_id);
          setParentId(item.group_id);
          setTitle(item.title);
        }}>
        <Block
          alignCenter
          justifyCenter
          paddingVertical={12}
          paddingHorizontal={8}
          backgroundColor={
            active === item.group_id
              ? `${config.general_active_color}1f`
              : theme.colors.white
          }
          borderColor="white">
          <Image source={{uri: item.picture}} style={styles.icoStyle} />
          <Text
            center
            size={12}
            color={
              active === item.group_id ? theme.colors.black : theme.colors.gray
            }>
            {item.title}
          </Text>
        </Block>
      </Pressable>
    );
  };

  return (
    <Block style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={category}
        keyExtractor={item => item.group_id}
        renderItem={_renderItem}
      />
    </Block>
  );
};

export default LeftBox;

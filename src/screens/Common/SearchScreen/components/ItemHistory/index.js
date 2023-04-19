import {icons} from '@assets';
import {Block, Text} from '@components';
import Storage from '@utils/storage';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import actions from '@redux/actions';

const ItemHistory = ({item, setSearch, setHistory}) => {
  const dispatch = useDispatch();

  const _onSelectHistory = () => {
    setSearch(item);
    dispatch({
      type: actions.GET_SEARCH_SCREEN,
      params: {
        keyword: item,
      },
    });
  };

  const _onRemoveHistory = () => {
    Storage.getItem('@history').then(res => {
      const newHistory = res.filter(value => value !== item);
      Storage.setItem('@history', JSON.stringify(newHistory));
      setHistory(newHistory);
    });
  };

  return (
    <Pressable onPress={_onSelectHistory} style={styles.button}>
      <Block row alignCenter>
        <Image style={styles.iconHistory} source={icons.history_search} />
        <Text color="placeholder">{item}</Text>
      </Block>
      <Pressable onPress={_onRemoveHistory} style={styles.btnClose}>
        <Image style={styles.iconClose} source={icons.close} />
      </Pressable>
    </Pressable>
  );
};

export default ItemHistory;

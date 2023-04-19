import {icons} from '@assets';
import {Block} from '@components';
import {useRoute} from '@react-navigation/core';
import actions, {_onUnmount} from '@redux/actions';
import React, {useContext} from 'react';
import {Image, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import Filter from '../Filter';
import Sort from '../Sort';
import styles from './styles';

const GroupSub = React.memo(({context}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {
    setPage,
    groupId,
    isList,
    setIsList,
    sort,
    setSort,
    rating,
    setRating,
    price,
    setPrice,
  } = useContext(context);

  const _onPress = item => {
    const action =
      groupId === 'SEARCH' ? actions.GET_SEARCH_DETAILS : actions.GET_PRODUCT;
    item && setSort(item.value);
    const sortParam = item ? item.value : sort;

    setPage(1);
    dispatch({type: _onUnmount(action)});
    dispatch({
      type: action,
      params: {
        p: 1,
        keyword: route.params.search,
        group_id: groupId === 'SEARCH' ? '' : groupId,
        sort: sortParam || '',
        average_rating: rating?.value || '',
        price_min: price?.min || '0',
        price_max: price?.max || '10000000',
      },
    });
  };

  return (
    <Block style={styles.sortWrap}>
      <Sort setSort={setSort} onPress={_onPress} />
      <Block
        width={1}
        height="100%"
        backgroundColor="smoke"
        marginHorizontal={15}
      />
      <Filter
        useRating={[rating, setRating]}
        usrPrice={[price, setPrice]}
        onPress={_onPress}
      />
      <Block
        width={1}
        height="100%"
        backgroundColor="smoke"
        marginHorizontal={15}
      />
      <Pressable onPress={() => setIsList(prev => !prev)}>
        <Image
          style={styles.iconMenu}
          source={isList ? icons.option : icons.list}
        />
      </Pressable>
    </Block>
  );
});

export default GroupSub;

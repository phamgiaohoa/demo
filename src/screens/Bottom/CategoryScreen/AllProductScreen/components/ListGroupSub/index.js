import {AnimatedImage, Block} from '@components';
import {GroupSubHolder} from '@components/Common/PlaceHolder';
import actions, {_onUnmount} from '@redux/actions';
import React, {useContext, useEffect} from 'react';
import {Pressable, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {AllProduct} from '../..';
import styles from './styles';

const ListGroupSub = () => {
  const dispatch = useDispatch();
  const {groupId, onSelectGroupSub} = useContext(AllProduct);
  const {data, isLoading} = useSelector(state => state.groupSub);

  useEffect(() => {
    dispatch({
      type: actions.GET_GROUP_SUB_CATEGORY,
      params: {
        parent_id: groupId,
      },
    });

    return () => dispatch({type: _onUnmount(actions.GET_GROUP_SUB_CATEGORY)});
  }, [dispatch, groupId]);

  const _renderGroupSub = ({item}) => {
    return (
      <Pressable style={styles.btnItem} onPress={() => onSelectGroupSub(item)}>
        <AnimatedImage
          source={'https://reactnative.dev/img/tiny_logo.png'}
          style={styles.icoGroupSub}
        />
        <Text center fontType="smibold">
          {item.title}
        </Text>
      </Pressable>
    );
  };

  return (
    <Block marginBottom={20}>
      {isLoading ? (
        <GroupSubHolder />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Block width={10} />}
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={_renderGroupSub}
          contentContainerStyle={styles.scrollView}
        />
      )}
    </Block>
  );
};

export default ListGroupSub;

/* eslint-disable react-native/no-inline-styles */
import {AnimatedImage, Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import actions from '@redux/actions';
import {width} from '@utils/responsive';
import React, {useEffect} from 'react';
import {FlatList, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const RightBox = ({parentId, title}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childCategory = useSelector(state => state.childCategory.data);
  const config = useSelector(state => state.config.data);

  useEffect(() => {
    dispatch({
      type: actions.GET_CHILD_GROUP_CATEGORY,
      params: {
        parent_id: parentId,
      },
    });
  }, [dispatch, parentId]);

  const _renderHeader = () => {
    return (
      <Block
        borderColor={`${config.general_active_color}99`}
        backgroundColor={`${config.general_active_color}99`}
        alignCenter
        padding={12}
        radius={5}
        marginBottom={8}>
        <Text size={15} fontType="bold" color={config.general_font_color}>
          {title}
        </Text>
      </Block>
    );
  };

  const _renderItem = ({item}) => {
    if (childCategory[0]?.picture_icon) {
      return (
        <Pressable
          style={{
            width: (width * 0.75) / 3,
            padding: 10,
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate(routes.ALL_PRODUCT_SCREEN, {
              group_id: item.group_id,
              title: item.title,
              friendly_link: item.friendly_link,
            })
          }>
          <AnimatedImage source={item.picture_icon} style={styles.groupImage} />
          <Text
            size={13}
            numberOfLines={2}
            center
            marginTop={5}
            marginHorizontal={2}>
            {item.title}
          </Text>
        </Pressable>
      );
    }

    return (
      <Pressable
        onPress={() =>
          navigation.navigate(routes.ALL_PRODUCT_SCREEN, {
            group_id: item.group_id,
            title: item.title,
            friendly_link: item.friendly_link,
          })
        }>
        <Block backgroundColor="white" padding={12} radius={5}>
          <Text>{item.title}</Text>
        </Block>
      </Pressable>
    );
  };

  return (
    <Block flex backgroundColor={`${config.general_active_color}1f`}>
      {childCategory?.[0]?.picture_icon ? (
        <Block flex>
          <FlatList
            numColumns={3}
            showsVerticalScrollIndicator={false}
            data={childCategory}
            keyExtractor={item => item.group_id}
            renderItem={_renderItem}
          />
        </Block>
      ) : (
        <Block flex padding={8}>
          {_renderHeader()}
          <Block flex>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={childCategory}
              keyExtractor={item => item.group_id}
              renderItem={_renderItem}
              ItemSeparatorComponent={() => <Block height={5} />}
            />
          </Block>
        </Block>
      )}
    </Block>
  );
};

export default RightBox;

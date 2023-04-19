import {AnimatedImage, Block, Text} from '@components';
import actions from '@redux/actions';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import React, {useRef} from 'react';
import {Pressable} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ItemGift = ({item}) => {
  const {item_id, picture, thumbnail, title, short, date_end} = item;

  const dispatch = useDispatch();
  const countDown = useRef(0);
  const config = useSelector(state => state.config.data);
  const user = useSelector(state => state.tokenUser.data);

  const _onChange = number => {
    countDown.current = number;
  };

  const _onSelectItem = () => {
    dispatch({
      type: actions.CHECK_USER_GIFT,
      params: {
        user,
        promotion_id: item_id,
      },
      item: {
        ...item,
        relativeTime: countDown.current,
      },
    });
  };

  const _getRelativeTime = () => {
    const today = new Date().getTime();
    const end = new Date(date_end).getTime();

    const one_day = 1000 * 60 * 60 * 24;
    const days = Math.round((end - today) / one_day);
    const result = days * 24 * 60 * 60;

    return result || 0;
  };

  return (
    <Pressable onPress={_onSelectItem} style={styles.itemWrap}>
      <AnimatedImage
        style={styles.banner}
        source={picture}
        thumbnail={thumbnail}
      />
      <Block flex marginVertical={15}>
        <Text numberOfLines={1} size={15} fontType="heavy">
          {title}
        </Text>
        <Text size={13} numberOfLines={5} marginTop={8} color="placeholder">
          {short}
        </Text>
      </Block>
      <Block row alignCenter space="between">
        <Text size={13} fontType="semibold">
          Thời gian còn lại:
        </Text>
        <CountDown
          until={_getRelativeTime()}
          onFinish={() => {}}
          timeToShow={['D', 'H', 'M', 'S']}
          timeLabels={{m: null, s: null}}
          showSeparator
          onChange={_onChange}
          digitStyle={{
            backgroundColor: config.general_active_color,
            width: getSize.s(25),
            height: getSize.s(25),
          }}
          digitTxtStyle={{
            color: theme.colors.white,
            fontSize: getSize.m(14),
          }}
          separatorStyle={{
            color: config.general_active_color,
            fontSize: getSize.m(14),
          }}
        />
      </Block>
    </Pressable>
  );
};

export default ItemGift;

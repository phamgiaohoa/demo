import {icons} from '@assets';
import {Block, Header, Text, WebView} from '@components';
import actions from '@redux/actions';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const NotificationDetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const {item_id} = route.params;
  const user = useSelector(state => state.tokenUser.data);
  const {data} = useSelector(state => state.notificationDetails);

  useEffect(() => {
    if (user) {
      dispatch({
        type: actions.GET_NOTIFICATION_DETAILS,
        params: {
          user,
          item_id,
        },
      });
    }
  }, [dispatch, item_id, user]);

  return (
    <Block flex backgroundColor={'white'}>
      <Header title="Chi tiết thông báo" canGoBack />
      <Block padding={12}>
        <Text fontType="semibold" size={16}>
          {data?.title}
        </Text>
        <Block row alignCenter marginVertical={10}>
          <Image
            source={icons.calendar}
            style={styles.iconStyle}
            resizeMode="contain"
          />
          <Text marginHorizontal={5}>{data?.date_create}</Text>
        </Block>
      </Block>
      <Block height={10} backgroundColor="smoke" />
      <Block flex padding={12} paddingBottom={30}>
        <WebView data={data?.content} />
      </Block>
    </Block>
  );
};

export default NotificationDetailsScreen;

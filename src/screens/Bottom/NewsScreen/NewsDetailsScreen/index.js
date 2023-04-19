/* eslint-disable react-native/no-inline-styles */
import {icons} from '@assets';
import {Block, Header, Text, WebView} from '@components';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'redux/actions';
import styles from './styles';

const NewsDetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const item_id = route.params.item_id;
  const dataDetail = useSelector(state => state.newsDetail.data);

  useEffect(() => {
    dispatch({
      type: actions.GET_NEWS_DETAIL,
      params: {
        item_id,
      },
    });
  }, [dispatch, item_id]);

  return (
    <Block flex backgroundColor="white">
      <Header canGoBack title="Tin tức chi tiết" />
      <Block flex backgroundColor="white">
        <Block padding={12}>
          <Text size={16} fontType="semibold">
            {dataDetail?.title}
          </Text>
          <Block row alignCenter marginVertical={10}>
            <Image
              source={icons.calendar}
              style={styles.iconStyle}
              resizeMode="contain"
            />
            <Text marginHorizontal={5}>{dataDetail?.date_update}</Text>
          </Block>
        </Block>
        <Block height={10} backgroundColor="smoke" />
        <WebView style={{margin: 12}} data={dataDetail?.content} />
      </Block>
    </Block>
  );
};

export default NewsDetailsScreen;

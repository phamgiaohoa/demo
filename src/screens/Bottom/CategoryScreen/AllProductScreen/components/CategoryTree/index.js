import {icons} from '@assets';
import {Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Buffer} from 'buffer';
import React, {useContext, useEffect, useRef} from 'react';
import {Image, Pressable, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {AllProduct} from '../..';
import styles from './styles';
global.Buffer = Buffer;

const CategoryTree = ({data, setData, friendly_link}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const {setGroupId, setTitleHeader} = useContext(AllProduct);
  const config = useSelector(state => state.config?.data);
  const userInfo = useSelector(state => state.userInfo.data);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({animated: true, duration: 500});
  }, [data]);

  const _onResetGroupId = () => {
    setGroupId(route.params.group_id);
    setTitleHeader(route.params.title);
    setData([]);
  };

  const _onPress = (item, index) => {
    setGroupId(item.group_id);
    setTitleHeader(item.title);
    setData(data.slice(0, index + 1));
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={config?.general_background_color}
      style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <Block row alignCenter>
          <Pressable onPress={() => navigation.navigate(routes.HOME_SCREEN)}>
            <Image
              style={styles.iconHome}
              source={icons.home_selected}
              resizeMode="contain"
            />
          </Pressable>
          <Image
            style={styles.iconNext}
            source={icons.next}
            resizeMode="contain"
          />
          <Pressable
            onPress={() => navigation.navigate(routes.CATEGORY_SCREEN)}>
            <Text color="white">Danh mục</Text>
          </Pressable>
          <Image
            style={styles.iconNext}
            source={icons.next}
            resizeMode="contain"
          />
          <Pressable onPress={_onResetGroupId}>
            <Text style={data.length ? {} : styles.textActive} color="white">
              {Buffer.from(
                route.params.title.replace('+', '/'),
                'base64',
              ).toString('base64') === route.params.title.replace('+', '/')
                ? Buffer.from(
                    route.params.title.replace('+', '/'),
                    'base64',
                  ).toString('utf8')
                : route.params.title}
            </Text>
          </Pressable>
        </Block>
        {data.map((item, index) => {
          const isEnd = data.length === index + 1;

          return (
            <Pressable
              key={`CategoryTre-${index}`}
              onPress={() => _onPress(item, index)}>
              <Block row alignCenter>
                <Image
                  style={styles.iconNext}
                  source={icons.next}
                  resizeMode="contain"
                />
                <Text style={isEnd ? styles.textActive : {}} color="white">
                  {item.title}
                </Text>
              </Block>
            </Pressable>
          );
        })}
      </ScrollView>
      {userInfo?.is_request_affiliates === '1' &&
        userInfo?.is_affiliates === '1' && (
          <Pressable
            onPress={() =>
              navigation.navigate(routes.ACCOUNT_AFFILIATE, friendly_link)
            }>
            <Image
              source={icons.copy}
              style={styles.iconAffiliate}
              resizeMode="contain"
            />
          </Pressable>
        )}
    </LinearGradient>
  );
};

export default CategoryTree;

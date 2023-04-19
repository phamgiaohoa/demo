/* eslint-disable react-native/no-inline-styles */
import {icons, lottie} from '@assets';
import {Block, Header} from '@components';
import {routes} from '@navigation/routes';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import ContentNotification from './components/ContentNotification';
import styles from './styles';

const data = [
  {
    icon: icons.home_selected,
    type_of: 'system',
  },
  {
    icon: icons.profile_selected,
    type_of: 'personal',
  },
  {
    icon: icons.coupon,
    type_of: 'promotion',
  },
];

const Tab = createMaterialTopTabNavigator();

const NotificationScreen = ({navigation}) => {
  const user = useSelector(state => state.tokenUser.data);
  const config = useSelector(state => state.config.data);

  const _onEmpty = () => navigation.navigate(routes.PROFILE_SCREEN);

  const _renderTabBarItem = ({
    route,
    navigationState,
    position,
    onPress,
    key,
    ...rest
  }) => {
    const tabIndex = navigationState.routes.indexOf(route);
    const isFocused = navigationState.index === tabIndex;
    const {icon} = data.find(({type_of}) => type_of === route.name);

    return (
      <Pressable
        key={key}
        onPress={onPress}
        style={{
          flex: 1,
          padding: getSize.m(15),
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftWidth: getSize.m(route.name !== 'system' ? 1 : 0),
          borderColor: theme.colors.smoke,
          backgroundColor: isFocused
            ? theme.colors.white
            : theme.colors.background,
        }}>
        <Image
          source={icon}
          style={{
            width: getSize.s(16),
            height: getSize.s(16),
            tintColor: theme.colors.placeholder,
            resizeMode: 'contain',
          }}
        />
      </Pressable>
    );
  };

  const _renderTabBar = props => {
    return (
      <MaterialTopTabBar {...props} renderTabBarItem={_renderTabBarItem} />
    );
  };

  return (
    <Block flex backgroundColor="white">
      <Header title={I18n.t('notificationScreen.label')} />
      {user ? (
        <Tab.Navigator
          lazy
          tabBar={_renderTabBar}
          tabBarOptions={{
            activeTintColor: theme.colors.blue,
            inactiveTintColor: theme.colors.placeholder,
            labelStyle: {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: getSize.m(14),
            },
            indicatorStyle: {
              backgroundColor: config.general_active_color,
              bottom: -2,
            },
          }}>
          {data.map((value, index) => (
            <Tab.Screen
              key={`NotificationScreen-${index}`}
              name={value.type_of}>
              {() => <ContentNotification type_of={value.type_of} />}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      ) : (
        <Empty
          lottie={lottie.bell}
          imageStyles={styles.icon}
          content={I18n.t('notificationScreen.Please')}
          contentMore={I18n.t('notificationScreen.login')}
          onPress={_onEmpty}
        />
      )}
    </Block>
  );
};

export default NotificationScreen;

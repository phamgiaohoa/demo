/* eslint-disable react-native/no-inline-styles */
import {Block, Header, Text} from '@components';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {Pressable, StatusBar} from 'react-native';
import ListCommission from './components/ListCommission';
import TotalCommission from './components/TotalCommission';

const Tab = createMaterialTopTabNavigator();

const CommissionManagement = () => {
  const _renderTabBarItem = ({
    route,
    navigationState,
    position,
    onPress,
    ...rest
  }) => {
    const tabIndex = navigationState.routes.indexOf(route);
    const isFocused = navigationState.index === tabIndex;

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        style={{
          flex: 1,
          padding: getSize.m(15),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isFocused
            ? theme.colors.white
            : theme.colors.background,
        }}>
        <Text
          style={{
            color: isFocused ? theme.colors.black : theme.colors.placeholder,
          }}>
          {route.name}
        </Text>
      </Pressable>
    );
  };

  const _renderTabBar = props => {
    return (
      <MaterialTopTabBar {...props} renderTabBarItem={_renderTabBarItem} />
    );
  };

  return (
    <Block flex backgroundColor={theme.colors.background}>
      <StatusBar translucent barStyle="dark-content" />
      <Header light title={I18n.t('commission.commission')} canGoBack />
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
            backgroundColor: theme.colors.blue,
            bottom: -2,
          },
        }}>
        <Tab.Screen
          name={I18n.t('commission.list')}
          component={ListCommission}
        />
        <Tab.Screen
          name={I18n.t('commission.total')}
          component={TotalCommission}
        />
      </Tab.Navigator>
    </Block>
  );
};

export default CommissionManagement;

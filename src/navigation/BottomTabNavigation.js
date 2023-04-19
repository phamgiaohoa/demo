import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {auth} from '@screens/Auth';
import {bottom} from '@screens/Bottom';
import I18n from 'i18n';
import React from 'react';
import {useSelector} from 'react-redux';
import CustomTabBar from './CustomTabBar';
import {routes} from './routes';

const Tab = createBottomTabNavigator();

const App = () => {
  const user = useSelector(state => state.tokenUser.data);

  return (
    <Tab.Navigator
      initialRouteName={routes.HOME_SCREEN}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name={routes.HOME_SCREEN}
        component={bottom.HOME_SCREEN}
        options={{tabBarLabel: I18n.t('homeScreen.label')}}
      />
      <Tab.Screen
        name={routes.CATEGORY_SCREEN}
        component={bottom.CATEGORY_SCREEN}
        options={{
          tabBarLabel: I18n.t('categoryScreen.label'),
        }}
      />
      <Tab.Screen
        name={routes.NEWS_SCREEN}
        component={bottom.NEWS_SCREEN}
        options={{tabBarLabel: I18n.t('newsScreen.label')}}
      />
      <Tab.Screen
        name={routes.NOTIFICATION_SCREEN}
        component={bottom.NOTIFICATION_SCREEN}
        options={{tabBarLabel: I18n.t('notificationScreen.label')}}
      />

      {user ? (
        <Tab.Screen
          name={routes.PROFILE_SCREEN}
          component={bottom.PROFILE_SCREEN}
          options={{tabBarLabel: I18n.t('profileScreen.label')}}
        />
      ) : (
        <Tab.Screen
          name={routes.PROFILE_SCREEN}
          component={auth.AUTH_CONTAINER}
          options={{tabBarLabel: I18n.t('profileScreen.label')}}
        />
      )}
    </Tab.Navigator>
  );
};

export default App;

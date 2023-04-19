import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {auth} from '@screens/Auth';
import {bottom} from '@screens/Bottom';
import {common} from '@screens/Common';
import React from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import BottomTab from './BottomTabNavigation';
import {navigationRef} from './RootNavigation';
import {APP_PREFIX, PATH_SCREENS, routes} from './routes';

const Stack = createStackNavigator();

const OPTIONS = {
  gestureEnabled: false,
  cardOverlayEnabled: true,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};

export default function MainContainer() {
  const config = useSelector(state => state.config?.data);

  const linking = {
    prefixes: APP_PREFIX,
    config: PATH_SCREENS,
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      {config && (
        <Stack.Navigator mode="modal" screenOptions={{headerShown: false}}>
          <Stack.Screen name={routes.BOTTOM_TAB} component={BottomTab} />
          <Stack.Screen
            name={routes.NEWS_DETAILS_SCREEN}
            component={bottom.NEWS_DETAILS_SCREEN}
          />
          <Stack.Screen
            name={routes.ALL_PRODUCT_SCREEN}
            component={bottom.ALL_PRODUCT_SCREEN}
          />
          <Stack.Screen
            name={routes.NOTIFICATION_DETAILS_SCREEN}
            component={bottom.NOTIFICATION_DETAILS_SCREEN}
          />
          <Stack.Screen
            name={routes.LIST_PRODUCT}
            component={bottom.LIST_PRODUCT}
          />
          <Stack.Screen
            name={routes.ORDER_MANAGEMENT}
            component={bottom.ORDER_MANAGEMENT}
          />
          <Stack.Screen
            name={routes.CATEGORY_DETAIL}
            component={bottom.CATEGORY_DETAIL}
          />
          <Stack.Screen
            name={routes.ALERT_BOX}
            component={common.ALERT_BOX}
            options={OPTIONS}
          />
          <Stack.Screen
            name={routes.CART_SCREEN}
            component={common.CART_SCREEN}
          />
          <Stack.Screen
            name={routes.CONFIRM_SCREEN}
            component={common.CONFIRM_SCREEN}
          />
          <Stack.Screen
            name={routes.PAYMENT_SCREEN}
            component={common.PAYMENT_SCREEN}
          />
          <Stack.Screen
            name={routes.SUCCESS_SCREEN}
            component={common.SUCCESS_SCREEN}
          />
          <Stack.Screen
            name={routes.INFORMATION_DETAILS}
            component={common.INFORMATION_DETAILS}
          />
          <Stack.Screen
            name={routes.PRODUCT_DETAIL}
            component={common.PRODUCT_DETAIL}
          />
          <Stack.Screen
            name={routes.ADDRESS_DETAILS}
            component={common.ADDRESS_DETAILS}
          />
          <Stack.Screen
            name={routes.LIST_PRODUCT_HOME}
            component={bottom.LIST_PRODUCT_HOME}
          />
          <Stack.Screen
            name={routes.EDIT_PROFILE}
            component={bottom.EDIT_PROFILE}
          />
          <Stack.Screen
            name={routes.COMMENT_DETAILS}
            component={common.COMMENT_DETAILS}
          />
          <Stack.Screen
            name={routes.FORGOT_PASS_SCREEN}
            component={auth.FORGOT_PASS_SCREEN}
          />
          <Stack.Screen
            name={routes.SEARCH_SCREEN}
            component={common.SEARCH_SCREEN}
          />
          <Stack.Screen
            name={routes.SEARCH_DETAILS_SCREEN}
            component={common.SEARCH_DETAILS_SCREEN}
          />
          <Stack.Screen
            name={routes.DISCOUNT_MANAGEMENT}
            component={bottom.DISCOUNT_MANAGEMENT}
          />
          <Stack.Screen
            name={routes.COMMISSION_MANAGEMENT}
            component={bottom.COMMISSION_MANAGEMENT}
          />
          <Stack.Screen
            name={routes.ACCOUNT_AFFILIATE}
            component={bottom.ACCOUNT_AFFILIATE}
          />
          <Stack.Screen name={routes.LIGHT_BOX} component={common.LIGHT_BOX} />
          <Stack.Screen
            name={routes.EVALUATE_MANAGEMENT}
            component={bottom.EVALUATE_MANAGEMENT}
          />
          <Stack.Screen name={routes.MY_GIFT} component={bottom.MY_GIFT} />
          <Stack.Screen
            name={routes.MY_GIFT_DETAILS}
            component={bottom.MY_GIFT_DETAILS}
          />
          <Stack.Screen
            name={routes.POINT_REWARD_MANAGEMENT}
            component={bottom.POINT_REWARD_MANAGEMENT}
          />
          <Stack.Screen
            name={routes.POINT_SWAP_HISTORY}
            component={bottom.POINT_SWAP_HISTORY}
          />
          <Stack.Screen
            name={routes.REFERRED_PEOPLE}
            component={bottom.REFERRED_PEOPLE}
          />
          <Stack.Screen
            name={routes.REFERRED_ORDER}
            component={bottom.REFERRED_ORDER}
          />
          <Stack.Screen
            name={routes.REFERRED_ORDER_DETAILS}
            component={bottom.REFERRED_ORDER_DETAILS}
          />
          <Stack.Screen
            name={routes.VNPAY_SCREEN}
            component={common.VNPAY_SCREEN}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

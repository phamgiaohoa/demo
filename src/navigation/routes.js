export const routes = {
  LOGIN_SCREEN: 'LOGIN_SCREEN',
  AUTH_SCREEN: 'AUTH_SCREEN',
  SIGNUP_SCREEN: 'SIGNUP_SCREEN',
  BOTTOM_TAB: 'BOTTOM_TAB',
  HOME_SCREEN: 'HOME_SCREEN',
  CATEGORY_SCREEN: 'CATEGORY_SCREEN',
  NEWS_SCREEN: 'NEWS_SCREEN',
  NOTIFICATION_SCREEN: 'NOTIFICATION_SCREEN',
  PROFILE_SCREEN: 'PROFILE_SCREEN',
  NEWS_DETAILS_SCREEN: 'NEWS_DETAILS_SCREEN',
  ALL_PRODUCT_SCREEN: 'ALL_PRODUCT_SCREEN',
  NOTIFICATION_DETAILS_SCREEN: 'NOTIFICATION_DETAILS_SCREEN',
  PRODUCT_DETAIL: 'PRODUCT_DETAIL',
  LIST_PRODUCT: 'LIST_PRODUCT',
  ORDER_MANAGEMENT: 'ORDER_MANAGEMENT',
  CATEGORY_DETAIL: 'CATEGORY_DETAIL',
  CART_SCREEN: 'CART_SCREEN',
  CONFIRM_SCREEN: 'CONFIRM_SCREEN',
  PAYMENT_SCREEN: 'PAYMENT_SCREEN',
  SUCCESS_SCREEN: 'SUCCESS_SCREEN',
  ALERT_BOX: 'ALERT_BOX',
  INFORMATION_DETAILS: 'INFORMATION_DETAILS',
  ADDRESS_DETAILS: 'ADDRESS_DETAILS',
  EMPTY_NOTIFICARTIOM: 'EMPTY_NOTIFICARTIOM',
  LIST_PRODUCT_HOME: 'LIST_PRODUCT_HOME',
  EDIT_PROFILE: 'EDIT_PROFILE',
  COMMENT_DETAILS: 'COMMENT_DETAILS',
  FORGOT_PASS_SCREEN: 'FORGOT_PASS_SCREEN',
  SEARCH_SCREEN: 'SEARCH_SCREEN',
  DISCOUNT_MANAGEMENT: 'DISCOUNT_MANAGEMENT',
  SEARCH_DETAILS_SCREEN: 'SEARCH_DETAILS_SCREEN',
  COMMISSION_MANAGEMENT: 'COMMISSION_MANAGEMENT',
  ACCOUNT_AFFILIATE: 'ACCOUNT_AFFILIATE',
  LIGHT_BOX: 'LIGHT_BOX',
  EVALUATE_MANAGEMENT: 'EVALUATE_MANAGEMENT',
  MY_GIFT: ' MY_GIFT',
  MY_GIFT_DETAILS: ' MY_GIFT_DETAILS',
  POINT_REWARD_MANAGEMENT: 'POINT_REWARD_MANAGEMENT',
  POINT_SWAP_HISTORY: 'POINT_SWAP_HISTORY',
  REFERRED_PEOPLE: 'REFERRED_PEOPLE',
  REFERRED_ORDER: 'REFERRED_ORDER',
  REFERRED_ORDER_DETAILS: 'REFERRED_ORDER_DETAILS',
  VNPAY_SCREEN: 'VNPAY_SCREEN',
};

export const APP_PREFIX = ['totvatot://', 'https://totvatot.com'];

export const PATH_SCREENS = {
  screens: {
    [routes.BOTTOM_TAB]: {
      initialRouteName: routes.HOME_SCREEN,
      screens: {
        [routes.HOME_SCREEN]: 'home',
        [routes.CATEGORY_SCREEN]: 'category',
        [routes.NEWS_SCREEN]: 'news',
        [routes.NOTIFICATION_SCREEN]: 'notification',
        [routes.PROFILE_SCREEN]: 'profile/:invitation_code?',
      },
    },
    [routes.PRODUCT_DETAIL]: 'product/:item_id/:deeplink_code?',
    [routes.NEWS_DETAILS_SCREEN]: 'news/:item_id',
    [routes.NOTIFICATION_DETAILS_SCREEN]: 'notification/:item_id',
    [routes.ALL_PRODUCT_SCREEN]: 'allproduct/:group_id/:title/:deeplink_code?',
  },
};
import {icons} from '@assets';
import {routes} from '@navigation/routes';
import I18n from 'i18n';

export const MANAGER_LIST = [
  {
    image: icons.promotion,
    title: I18n.t('profileScreen.code'),
    navigation: routes.DISCOUNT_MANAGEMENT,
    param: {
      type: 'profile',
    },
  },
  {
    image: icons.hand_gesture,
    title: I18n.t('profileScreen.pointManagement'),
    navigation: routes.POINT_REWARD_MANAGEMENT,
  },
  {
    image: icons.exchange,
    title: I18n.t('profileScreen.pointHistory'),
    navigation: routes.POINT_SWAP_HISTORY,
  },
];

export const GENERAL_LIST = [
  {
    image: icons.heart_pink,
    title: I18n.t('profileScreen.likeProduct'),
    navigation: routes.LIST_PRODUCT,
    params: {
      title: I18n.t('profileScreen.likeProduct'),
      type: 'LIKED',
    },
  },
  {
    image: icons.eye,
    title: I18n.t('profileScreen.viewProduct'),
    navigation: routes.LIST_PRODUCT,
    params: {
      title: I18n.t('profileScreen.viewProduct'),
      type: 'WATCHED',
    },
  },
  {
    image: icons.shopping_history,
    title: I18n.t('profileScreen.productLate'),
    navigation: routes.LIST_PRODUCT,
    params: {
      title: I18n.t('profileScreen.productLate'),
      type: 'LATER',
    },
  },
  {
    image: icons.income_fee,
    title: I18n.t('profileScreen.commission'),
    navigation: routes.COMMISSION_MANAGEMENT,
    params: {
      isShow: true,
    },
  },
  {
    image: icons.gift_box,
    title: I18n.t('profileScreen.gift'),
    navigation: routes.MY_GIFT,
  },
  {
    image: icons.placeholder,
    title: I18n.t('profileScreen.info'),
    navigation: routes.ADDRESS_DETAILS,
    params: {
      isShow: true,
    },
  },
  {
    image: icons.affiliate,
    title: I18n.t('profileScreen.affiliate'),
    navigation: routes.ACCOUNT_AFFILIATE,
  },
  {
    image: icons.referredPeople,
    title: I18n.t('profileScreen.referrerTitle'),
    navigation: routes.REFERRED_PEOPLE,
  },
];

export const SUPPORT_LIST = [
  {
    image: icons.star,
    title: I18n.t('profileScreen.evaluation'),
    navigation: routes.EVALUATE_MANAGEMENT,
  },
  // {
  //   image: icons.support,
  //   title: I18n.t('profileScreen.chatWith'),
  // },
];

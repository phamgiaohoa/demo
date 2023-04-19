import {reducerAdvance, reducerDefault} from '@redux/common/reducers';
import Actions from '../actions';

export const gift = (...props) => {
  return reducerAdvance(...props, Actions.GET_USER_GIFT);
};

export const giftDetails = (...props) => {
  return reducerAdvance(...props, Actions.GET_USER_GIFT_DETAILS);
};

export const confirmGift = (...props) => {
  return reducerDefault(...props, Actions.CONFIRM_USER_GIFT);
};

export const checkGift = (...props) => {
  return reducerDefault(...props, Actions.CHECK_USER_GIFT);
};

export const GiftReducer = {gift, giftDetails, confirmGift, checkGift};

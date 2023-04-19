import {reducerDefault} from '@redux/common/reducers';
import Actions from '../actions';

export const promotion = (...props) => {
  return reducerDefault(...props, Actions.GET_PROMOTION);
};

export const usePromotion = (...props) => {
  return reducerDefault(...props, Actions.USE_PROMOTION);
};

export const voucherProduct = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_VOUCHER_PRODUCT:
      return [...state, action.voucher];

    case Actions.REMOVE_VOUCHER_PRODUCT:
      return state.filter(
        ({promotion_id}) => promotion_id !== action.promotion_id,
      );

    default:
      return state;
  }
};

export const PromotionReducer = {promotion, usePromotion, voucherProduct};

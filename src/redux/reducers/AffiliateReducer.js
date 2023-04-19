import {reducerAdvance, reducerDefault} from '@redux/common/reducers';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

export const stateLoadMore = {
  data: null,
  totalPage: null,
  isLoading: true,
  totalCommission: null,
};

export const signupAffiliate = (...props) => {
  return reducerDefault(...props, Actions.SIGNUP_AFFILIATE);
};

export const addDeepLink = (...props) => {
  return reducerDefault(...props, Actions.ADD_DEEP_LINK);
};

export const deepLink = (...props) => {
  return reducerAdvance(...props, Actions.GET_DEEP_LINK);
};

export const ReferredPeople = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_LIST_REFERRED_PEOPLE:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_LIST_REFERRED_PEOPLE): {
      const newData = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? newData : action.data,
        totalPage: action.totalPage,
        totalCommission: action.totalCommission,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_LIST_REFERRED_PEOPLE):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_LIST_REFERRED_PEOPLE):
      return {...stateLoadMore};
    default:
      return state;
  }
};

export const Referred_Order = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_REFERRED_ORDER:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_REFERRED_ORDER): {
      const newData = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? newData : action.data,
        totalPage: action.totalPage,
        totalCommission: action.totalCommission,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_REFERRED_ORDER):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_REFERRED_ORDER):
      return {...stateLoadMore};
    default:
      return state;
  }
};

export const Referred_Order_details = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_REFERRED_ORDER_DETAILS:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_REFERRED_ORDER_DETAILS): {
      const newData = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? newData : action.data,
        totalPage: action.totalPage,
        info: action.info,
        totalCommission: action.totalCommission,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_REFERRED_ORDER_DETAILS):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_REFERRED_ORDER_DETAILS):
      return {...stateLoadMore};
    default:
      return state;
  }
};

export const addUserRecommend = (...props) => {
  return reducerDefault(...props, Actions.ADD_USER_RECOMMEND);
};

export const AffiliateReducer = {
  signupAffiliate,
  addDeepLink,
  deepLink,
  ReferredPeople,
  addUserRecommend,
  Referred_Order,
  Referred_Order_details,
};

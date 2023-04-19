import {stateLoadMore} from '@redux/common/initialStates';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

export const discount = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_DISCOUNT:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_DISCOUNT): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
        total: action.total,
      };
    }
    case _onFail(Actions.GET_DISCOUNT):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_DISCOUNT):
      return stateLoadMore;
    default:
      return state;
  }
};

export const DiscountReducer = {discount};

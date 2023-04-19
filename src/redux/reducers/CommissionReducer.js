import {stateLoadMore} from '@redux/common/initialStates';
import {reducerDefault} from '@redux/common/reducers';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

export const commission = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_COMMISSION:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_COMMISSION): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        info: action.info,
        lang: action.lang,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_COMMISSION):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_COMMISSION):
      return stateLoadMore;
    default:
      return state;
  }
};

export const config = (...props) => {
  return reducerDefault(...props, Actions.SWAP_COMMISSION);
};

export const total_score = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.TOTAL_SCORE_COMMISSION:
      return {...state, isLoading: true};
    case _onSuccess(Actions.TOTAL_SCORE_COMMISSION): {
      return {
        total_withdrawal: action.total_withdrawal,
        wcoin_to_money: action.wcoin_to_money,
      };
    }
    case _onFail(Actions.TOTAL_SCORE_COMMISSION):
      return {...state, isLoading: false};
    case _onUnmount(Actions.TOTAL_SCORE_COMMISSION):
      return stateLoadMore;
    default:
      return state;
  }
};

export const swapCommissionLog = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.SWAP_COMMISSION_LOG:
      return {...state, isLoading: true};
    case _onSuccess(Actions.SWAP_COMMISSION_LOG): {
      const data = state.data ? [...state.data, ...action.data] : action.data;
      return {
        data: action.isLoadMore ? data : action.data,
        totalPage: action.totalPage,
        info: action.info,
        isLoading: false,
      };
    }
    case _onFail(Actions.SWAP_COMMISSION_LOG):
      return {...state, isLoading: false};
    case _onUnmount(Actions.SWAP_COMMISSION_LOG):
      return {...stateLoadMore};
    default:
      return state;
  }
};

export const coinLog = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_USER_WCOIN_LOG:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_USER_WCOIN_LOG): {
      const data = state.data ? [...state.data, ...action.data] : action.data;
      return {
        data: action.isLoadMore ? data : action.data,
        totalPage: action.totalPage,
        info: action.info,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_USER_WCOIN_LOG):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_USER_WCOIN_LOG):
      return {...stateLoadMore};
    default:
      return state;
  }
};

export const CommissionReducer = {
  commission,
  total_score,
  swapCommissionLog,
  coinLog,
};

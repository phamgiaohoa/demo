import {stateLoadMore} from '@redux/common/initialStates';
import {reducerDefault} from '@redux/common/reducers';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

export const news = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_NEWS:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_NEWS): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_NEWS):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_NEWS):
      return {...stateLoadMore};
    default:
      return state;
  }
};

export const newsDetail = (...props) => {
  return reducerDefault(...props, Actions.GET_NEWS_DETAIL);
};

export const NewsReducer = {news, newsDetail};

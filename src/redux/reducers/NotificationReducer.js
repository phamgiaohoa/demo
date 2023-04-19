import {stateLoadMore} from '@redux/common/initialStates';
import {reducerDefault} from '@redux/common/reducers';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

const reducer = (state = stateLoadMore, action, actions) => {
  switch (action.type) {
    case actions:
      return {...state, isLoading: true};
    case Actions.CHANGE_STATUS_NOTIFICATION: {
      const newData = state.data?.map(value => {
        return value.item_id === action.item_id
          ? {...value, status: 'readed'}
          : value;
      });
      return {...state, data: newData};
    }
    case _onSuccess(actions): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(actions):
      return {...state, isLoading: false};
    case _onUnmount(actions):
      return {...stateLoadMore};
    default:
      return state;
  }
};

export const notificationGeneral = (...props) => {
  return reducer(...props, Actions.GET_NOTIFICATION_GENERAL);
};

export const notificationPersonal = (...props) => {
  return reducer(...props, Actions.GET_NOTIFICATION_PERSONAL);
};

export const notificationPromotion = (...props) => {
  return reducer(...props, Actions.GET_NOTIFICATION_PROMOTION);
};

export const updateNotify = (...props) => {
  return reducerDefault(...props, Actions.UPDATE_NOTIFICATION);
};

export const totalNotify = (...props) => {
  return reducerDefault(...props, Actions.GET_TOTAL_NOTIFICATION);
};

export const notificationDetails = (...props) => {
  return reducerDefault(...props, Actions.GET_NOTIFICATION_DETAILS);
};

export const NotificationReducer = {
  notificationGeneral,
  notificationPersonal,
  notificationPromotion,
  updateNotify,
  totalNotify,
  notificationDetails,
};

import {stateDefault} from '@redux/common/initialStates';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';
import {reducerDefault} from '../common/reducers';

export const order = (state = stateDefault, action) => {
  switch (action.type) {
    case Actions.GET_ORDER: {
      return {...state, isLoading: true};
    }
    case _onSuccess(Actions.GET_ORDER): {
      return {...state, data: action.data, isLoading: false};
    }
    case _onFail(Actions.GET_ORDER): {
      return {...state, isLoading: false};
    }
    case _onUnmount(Actions.GET_ORDER): {
      return {...stateDefault};
    }
    default: {
      return state;
    }
  }
};

export const orderDetails = (...props) => {
  return reducerDefault(...props, Actions.GET_ORDER_DETAILS);
};

export const OrderManaReducer = {order, orderDetails};

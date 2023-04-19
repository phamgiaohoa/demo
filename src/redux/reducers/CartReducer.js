import {stateDefault} from '@redux/common/initialStates';
import {reducerDefault} from '@redux/common/reducers';
import actions from '../actions';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

export const cart = (state = {...stateDefault, total_payment: 0}, action) => {
  switch (action.type) {
    case actions.GET_CART:
      return {...state, isLoading: true};
    case _onSuccess(actions.GET_CART):
      return {
        data: action.data,
        total_payment: action.total_payment,
        isLoading: false,
      };
    case _onFail(actions.GET_CART):
      return {...state, isLoading: false};
    case _onUnmount(actions.GET_CART):
      return {...stateDefault};
    default:
      return state;
  }
};

export const updateCart = (...props) => {
  return reducerDefault(...props, Actions.UPDATE_CART);
};

export const CartReducer = {cart, updateCart};

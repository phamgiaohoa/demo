import {reducerDefault} from '@redux/common/reducers';
import Actions from '../actions';

export const orderShip = (...props) => {
  return reducerDefault(...props, Actions.GET_ORDER_SHIP);
};

export const orderMethod = (...props) => {
  return reducerDefault(...props, Actions.GET_ORDER_METHOD);
};

export const priceShip = (...props) => {
  return reducerDefault(...props, Actions.GET_PRICE_SHIP);
};

export const orderComplete = (...props) => {
  return reducerDefault(...props, Actions.ORDER_COMPLETE);
};

export const orderCompletedeExpired = (...props) => {
  return reducerDefault(...props, Actions.ORDER_COMPLETE_EXPIRED);
};


export const orderStatus = (...props) => {
  return reducerDefault(...props, Actions.GET_ORDER_STATUS);
};

export const OrderReducer = {
  orderShip,
  orderMethod,
  priceShip,
  orderComplete,
  orderStatus,
  orderCompletedeExpired,
};

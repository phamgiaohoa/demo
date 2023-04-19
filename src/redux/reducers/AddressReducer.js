import {reducerDefault} from '@redux/common/reducers';
import Actions from '../actions';

export const address = (...props) => {
  return reducerDefault(...props, Actions.GET_ADDRESS);
};

export const addAddress = (...props) => {
  return reducerDefault(...props, Actions.ADD_ADDRESS);
};

export const deleteAddress = (...props) => {
  return reducerDefault(...props, Actions.DELETE_ADDRESS);
};

export const updateAddress = (...props) => {
  return reducerDefault(...props, Actions.UPDATE_ADDRESS);
};

export const AddressReducer = {
  address,
  addAddress,
  deleteAddress,
  updateAddress,
};

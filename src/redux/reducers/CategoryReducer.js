import {reducerDefault} from '@redux/common/reducers';
import Actions from '../actions';

export const category = (...props) => {
  return reducerDefault(...props, Actions.GET_GROUP_CATEGORY);
};

export const childCategory = (...props) => {
  return reducerDefault(...props, Actions.GET_CHILD_GROUP_CATEGORY);
};

export const groupSub = (...props) => {
  return reducerDefault(...props, Actions.GET_GROUP_SUB_CATEGORY);
};

export const CategoryReducer = {category, childCategory, groupSub};

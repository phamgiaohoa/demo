import {reducerDefault} from '@redux/common/reducers';
import Actions from '../actions';

export const banner = (...props) => {
  return reducerDefault(...props, Actions.GET_BANNER);
};

export const BannerReducer = {banner};

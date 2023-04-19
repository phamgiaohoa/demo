import {reducerDefault} from '@redux/common/reducers';
import Actions from '../actions';

export const useWCoin = (...props) => {
  return reducerDefault(...props, Actions.USE_WCOIN);
};

export const CoinReducer = {useWCoin};

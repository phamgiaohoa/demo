import {stateLoadMore} from '@redux/common/initialStates';
import {
  reducerAdvance,
  reducerDefault,
  reducerLoadMore,
} from '@redux/common/reducers';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

export const product = (...props) => {
  return reducerLoadMore(...props, Actions.GET_PRODUCT);
};

export const productDetails = (...props) => {
  return reducerDefault(...props, Actions.GET_PRODUCT_DETAILS);
};

export const homeFocus = (...props) => {
  return reducerDefault(...props, Actions.GET_HOME_FOCUS);
};

export const shock = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_PRODUCT_SHOCK:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_PRODUCT_SHOCK): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_PRODUCT_SHOCK):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_PRODUCT_SHOCK):
      return stateLoadMore;
    default:
      return state;
  }
};

export const focus = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_PRODUCT_FOCUS:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_PRODUCT_FOCUS): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_PRODUCT_FOCUS):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_PRODUCT_FOCUS):
      return stateLoadMore;
    default:
      return state;
  }
};

export const topSell = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_PRODUCT_TOP_SELL:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_PRODUCT_TOP_SELL): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_PRODUCT_TOP_SELL):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_PRODUCT_TOP_SELL):
      return stateLoadMore;
    default:
      return state;
  }
};

export const productOptions = (...props) => {
  return reducerDefault(...props, Actions.GET_PRODUCT_OPTION);
};

export const productOptionsDetails = (...props) => {
  return reducerDefault(...props, Actions.GET_PRODUCT_OPTION_DETAILS);
};

export const favorited = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_FAVORITE_PRODUCT:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_FAVORITE_PRODUCT): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_FAVORITE_PRODUCT):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_FAVORITE_PRODUCT):
      return stateLoadMore;
    default:
      return state;
  }
};

export const viewed = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_VIEWED_PRODUCT:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_VIEWED_PRODUCT): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_VIEWED_PRODUCT):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_VIEWED_PRODUCT):
      return stateLoadMore;
    default:
      return state;
  }
};

export const later = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_LATER_PRODUCT:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_LATER_PRODUCT): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_LATER_PRODUCT):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_LATER_PRODUCT):
      return stateLoadMore;
    default:
      return state;
  }
};

export const review = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.GET_REVIEWS_PRODUCT:
      return {...state, isLoading: true};
    case _onSuccess(Actions.GET_REVIEWS_PRODUCT): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.GET_REVIEWS_PRODUCT):
      return {...state, isLoading: false};
    case _onUnmount(Actions.GET_REVIEWS_PRODUCT):
      return stateLoadMore;
    default:
      return state;
  }
};

export const search = (...props) => {
  return reducerLoadMore(...props, Actions.GET_SEARCH_SCREEN);
};

export const searchDetails = (...props) => {
  return reducerLoadMore(...props, Actions.GET_SEARCH_DETAILS);
};

export const buy_later = (...props) => {
  return reducerLoadMore(...props, Actions.GET_PRODUCT_BUY_LATER);
};
export const favoriteProduct = (...props) => {
  return reducerDefault(...props, Actions.GET_SHOW_FAVORITE_PRODUCT);
};

export const userRating = (state = stateLoadMore, action) => {
  switch (action.type) {
    case Actions.USER_RATING:
      return {...state, isLoading: true};
    case _onSuccess(Actions.USER_RATING): {
      const dataLoad = state.data
        ? [...state.data, ...action.data]
        : action.data;
      return {
        data: action.isLoadMore ? dataLoad : action.data,
        totalPage: action.totalPage,
        isLoading: false,
      };
    }
    case _onFail(Actions.USER_RATING):
      return {...state, isLoading: false};
    case _onUnmount(Actions.USER_RATING):
      return stateLoadMore;
    default:
      return state;
  }
};

export const comboProduct = (...props) => {
  return reducerAdvance(...props, Actions.GET_COMBO_PRODUCT);
};

export const comboProductDetails = (...props) => {
  return reducerDefault(...props, Actions.GET_COMBO_PRODUCT_DETAILS);
};

export const combo = (...props) => {
  return reducerAdvance(...props, Actions.GET_COMBO);
};

export const comboAll = (...props) => {
  return reducerAdvance(...props, Actions.GET_COMBO_ALL);
};

export const homeProduct = (...props) => {
  return reducerAdvance(...props, Actions.GET_HOME_PRODUCT);
};

export const ProductReducer = {
  product,
  productDetails,
  homeFocus,
  shock,
  focus,
  topSell,
  productOptions,
  productOptionsDetails,
  favorited,
  viewed,
  later,
  review,
  search,
  searchDetails,
  favoriteProduct,
  userRating,
  comboProduct,
  comboProductDetails,
  combo,
  comboAll,
  homeProduct,
};

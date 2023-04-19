import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import queryString from 'query-string';
import {delay, put, select, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

function* getProduct(actions) {
  try {
    const res = yield API.get('getProduct?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_PRODUCT),
      data: res.data,
      totalPage: res.total_page,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRODUCT)});
    hanldeError(error);
  }
}

function* getProductDetails(actions) {
  try {
    const res = yield API.get('getProduct', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_PRODUCT_DETAILS),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRODUCT_DETAILS)});
    hanldeError(error);
  }
}

function* getHomeFocus(actions) {
  try {
    const user = yield select(state => state.tokenUser.data);
    const res = yield API.get('getHomeFocus', {user, ...actions});
    yield put({
      type: _onSuccess(Actions.GET_HOME_FOCUS),
      data: Object.values(res.data),
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_HOME_FOCUS)});
    hanldeError(error);
  }
}

function* getProductShock(actions) {
  try {
    const res = yield API.get(
      'getProduct?type=is_shock_today&numshow=12',
      actions.params,
    );
    yield put({
      type: _onSuccess(Actions.GET_PRODUCT_SHOCK),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRODUCT_SHOCK)});
    hanldeError(error);
  }
}

function* getProductFocus(actions) {
  try {
    const res = yield API.get(
      'getProduct?type=is_focus&numshow=12',
      actions.params,
    );
    yield put({
      type: _onSuccess(Actions.GET_PRODUCT_FOCUS),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRODUCT_FOCUS)});
    hanldeError(error);
  }
}

function* getProductTopSell(actions) {
  try {
    const res = yield API.get(
      'getProduct?type=is_topsell&numshow=12',
      actions.params,
    );
    yield put({
      type: _onSuccess(Actions.GET_PRODUCT_TOP_SELL),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRODUCT_TOP_SELL)});
    hanldeError(error);
  }
}

function* getProductOption(actions) {
  try {
    const res = yield API.get('getProductOption', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_PRODUCT_OPTION),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRODUCT_OPTION)});
    hanldeError(error);
  }
}

function* getProductOptionDetail(actions) {
  try {
    const res = yield API.get('getProductOptionDetail', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_PRODUCT_OPTION_DETAILS),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRODUCT_OPTION_DETAILS)});
    hanldeError(error);
  }
}

function* getFavoriteProduct(actions) {
  try {
    const res = yield API.get('getFavorite?numshow=12', actions.params);

    yield put({
      type: _onSuccess(Actions.GET_FAVORITE_PRODUCT),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_FAVORITE_PRODUCT)});
    hanldeError(error);
  }
}

function* getViewedProduct(actions) {
  try {
    const res = yield API.get(
      'getProduct?type=list_viewed&numshow=12',
      actions.params,
    );
    yield put({
      type: _onSuccess(Actions.GET_VIEWED_PRODUCT),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_VIEWED_PRODUCT)});
    hanldeError(error);
  }
}

function* getLaterProduct(actions) {
  try {
    const res = yield API.get(
      'getProduct?type=save_for_late&numshow=12',
      actions.params,
    );
    yield put({
      type: _onSuccess(Actions.GET_LATER_PRODUCT),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_LATER_PRODUCT)});
    hanldeError(error);
  }
}

function* getReviewsProduct(actions) {
  try {
    const res = yield API.get('getRatingProduct?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_REVIEWS_PRODUCT),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_REVIEWS_PRODUCT)});
    hanldeError(error);
  }
}

function* getSearch(actions) {
  try {
    const res = yield API.get('getProduct?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_SEARCH_SCREEN),
      data: res.data,
      totalPage: res.total_page,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_SEARCH_SCREEN)});
    hanldeError(error);
  }
}

function* getSearchDetails(actions) {
  try {
    const res = yield API.get('getProduct?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_SEARCH_DETAILS),
      data: res.data,
      totalPage: res.total_page,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_SEARCH_DETAILS)});
    hanldeError(error);
  }
}

function* checkBuyLater(actions) {
  try {
    const body = queryString.stringify(actions.body);
    yield API.post('productForLater', body, actions.params);
    yield put({
      type: _onUnmount(Actions.GET_LATER_PRODUCT),
    });
    yield put({
      type: Actions.GET_LATER_PRODUCT,
      params: {
        user: actions.user,
      },
    });
  } catch (error) {
    yield put({type: _onFail(Actions.CHECK_BUY_LATER)});
    hanldeError(error);
  }
}

function* add_viewedProduct(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('viewedProduct?user=', body, actions.params);
    yield put({
      type: _onSuccess(Actions.ADD_PRODUCT_VIEWED),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.ADD_PRODUCT_VIEWED)});
    hanldeError(error);
  }
}

function* checkFavorite(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('checkFavorite?user=', body, actions.params);
    yield put({
      type: _onSuccess(Actions.CHECK_FAVORITE),
      data: res.data,
    });

    if (actions.isGetData) {
      yield put({
        type: _onUnmount(Actions.GET_FAVORITE_PRODUCT),
      });
      yield put({
        type: Actions.GET_FAVORITE_PRODUCT,
        params: {
          user: actions.params.user,
        },
      });
    }

    if (actions.check) {
      yield put({
        type: _onUnmount(Actions.GET_SHOW_FAVORITE_PRODUCT),
      });
      yield put({
        type: Actions.GET_SHOW_FAVORITE_PRODUCT,
        params: {
          user: actions.params.user,
        },
      });
    }
  } catch (error) {
    yield put({type: _onFail(Actions.CHECK_FAVORITE)});
  }
}

function* showFavorite(actions) {
  try {
    const res = yield API.get('getFavorite?numshow=12', actions.params);

    yield put({
      type: _onSuccess(Actions.GET_SHOW_FAVORITE_PRODUCT),
      data: res.data,
      totalPage: res.total_page,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_SHOW_FAVORITE_PRODUCT)});
    hanldeError(error);
  }
}

function* ratingProduct(actions) {
  try {
    const res = yield API.postFormData(
      `ratingProduct?user=${actions.user}`,
      actions.formData,
    );
    yield put({
      type: _onSuccess(Actions.RATING_PRODUCT),
      data: res.data,
    });
    yield put({
      type: Actions.GET_REVIEWS_PRODUCT,
      params: {
        item_id: actions.item_id,
        p: 1,
      },
    });
    yield put({
      type: Actions.GET_PRODUCT_DETAILS,
      params: {
        item_id: actions.item_id,
      },
    });
  } catch (error) {
    yield put({type: _onFail(Actions.RATING_PRODUCT)});
    yield delay(300);
    hanldeError(error);
  }
}

function* userRating(actions) {
  try {
    const res = yield API.get('getRatingProduct', actions.params);
    yield put({
      type: _onSuccess(Actions.USER_RATING),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.USER_RATING)});
    hanldeError(error);
  }
}

function* getComboProduct(actions) {
  try {
    const res = yield API.get('getCombo?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_COMBO_PRODUCT),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_COMBO_PRODUCT)});
    hanldeError(error);
  }
}

function* getComboProductDetails(actions) {
  try {
    const res = yield API.get('getCombo?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_COMBO_PRODUCT_DETAILS),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_COMBO_PRODUCT_DETAILS)});
    hanldeError(error);
  }
}

function* getCombo(actions) {
  try {
    const res = yield API.get('getCombo', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_COMBO),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_COMBO)});
    hanldeError(error);
  }
}

function* getComboAll(actions) {
  try {
    const res = yield API.get('getCombo', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_COMBO_ALL),
      data: res.data,
      total: res.total,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_COMBO_ALL)});
    hanldeError(error);
  }
}

function* getHomeProduct(actions) {
  try {
    const user = yield select(state => state.tokenUser.data);
    const res = yield API.get('getHomeProduct', {user, ...actions.params});
    yield put({
      type: _onSuccess(Actions.GET_HOME_PRODUCT),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_HOME_PRODUCT)});
    hanldeError(error);
  }
}

export function* watchProductSagas() {
  yield takeLatest(Actions.GET_PRODUCT, getProduct);
  yield takeLatest(Actions.GET_PRODUCT_DETAILS, getProductDetails);
  yield takeLatest(Actions.GET_HOME_FOCUS, getHomeFocus);
  yield takeLatest(Actions.GET_PRODUCT_SHOCK, getProductShock);
  yield takeLatest(Actions.GET_PRODUCT_FOCUS, getProductFocus);
  yield takeLatest(Actions.GET_PRODUCT_TOP_SELL, getProductTopSell);
  yield takeLatest(Actions.GET_PRODUCT_OPTION, getProductOption);
  yield takeLatest(Actions.GET_PRODUCT_OPTION_DETAILS, getProductOptionDetail);
  yield takeLatest(Actions.GET_FAVORITE_PRODUCT, getFavoriteProduct);
  yield takeLatest(Actions.GET_VIEWED_PRODUCT, getViewedProduct);
  yield takeLatest(Actions.GET_LATER_PRODUCT, getLaterProduct);
  yield takeLatest(Actions.GET_REVIEWS_PRODUCT, getReviewsProduct);
  yield takeLatest(Actions.GET_SEARCH_SCREEN, getSearch);
  yield takeLatest(Actions.GET_SEARCH_DETAILS, getSearchDetails);
  yield takeLatest(Actions.CHECK_BUY_LATER, checkBuyLater);
  yield takeLatest(Actions.ADD_PRODUCT_VIEWED, add_viewedProduct);
  yield takeLatest(Actions.CHECK_FAVORITE, checkFavorite);
  yield takeLatest(Actions.GET_SHOW_FAVORITE_PRODUCT, showFavorite);
  yield takeLatest(Actions.RATING_PRODUCT, ratingProduct);
  yield takeLatest(Actions.USER_RATING, userRating);
  yield takeLatest(Actions.GET_COMBO_PRODUCT, getComboProduct);
  yield takeLatest(Actions.GET_COMBO_PRODUCT_DETAILS, getComboProductDetails);
  yield takeLatest(Actions.GET_COMBO, getCombo);
  yield takeLatest(Actions.GET_COMBO_ALL, getComboAll);
  yield takeLatest(Actions.GET_HOME_PRODUCT, getHomeProduct);
}

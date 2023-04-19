import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import queryString from 'query-string';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getCart(actions) {
  try {
    const res = yield API.get('getCart', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_CART),
      data: res.data || [],
      total_payment: res.total_payment || 0,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_CART)});
    hanldeError(error);
  }
}

function* updateCart(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('updateCart', body, actions.params);
    yield put({
      type: _onSuccess(Actions.UPDATE_CART),
      data: res.data,
    });
    yield put({
      type: Actions.GET_CART,
      params: {
        user: actions.params.user,
      },
    });
  } catch (error) {
    yield put({type: _onFail(Actions.UPDATE_CART)});
    hanldeError(error);
  }
}

export function* watchCartSagas() {
  yield takeLatest(Actions.GET_CART, getCart);
  yield takeLatest(Actions.UPDATE_CART, updateCart);
}

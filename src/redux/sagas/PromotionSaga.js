import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {CustomToast} from '@utils/helper';
import queryString from 'query-string';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getPromotion(actions) {
  try {
    const res = yield API.get('getPromotionList', actions.params);
    yield put({type: _onSuccess(Actions.GET_PROMOTION), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PROMOTION)});
    hanldeError(error);
  }
}

function* usePromotion(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('usePromotionCode', body, actions.params);
    yield put({type: _onSuccess(Actions.USE_PROMOTION), data: res});
    yield CustomToast(res.message);
  } catch (error) {
    yield put({type: _onFail(Actions.USE_PROMOTION)});
    hanldeError(error);
  }
}

export function* watchPromotionSagas() {
  yield takeLatest(Actions.GET_PROMOTION, getPromotion);
  yield takeLatest(Actions.USE_PROMOTION, usePromotion);
}

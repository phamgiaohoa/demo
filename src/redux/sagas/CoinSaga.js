import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {CustomToast} from '@utils/helper';
import queryString from 'query-string';
import {call, delay, put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

function* useWCoin(actions) {
  try {
    const body = queryString.stringify(actions.body);
    yield put({type: _onUnmount(Actions.USE_WCOIN)});
    const res = yield API.post('useWcoin', body, actions.params);
    yield put({type: _onSuccess(Actions.USE_WCOIN), data: res});
    yield delay(500);
    yield call(() => CustomToast(res.message));
  } catch (error) {
    yield put({type: _onFail(Actions.USE_WCOIN)});
    yield delay(500);
    hanldeError(error);
  }
}

export function* watchUseWCoinSagas() {
  yield takeLatest(Actions.USE_WCOIN, useWCoin);
}

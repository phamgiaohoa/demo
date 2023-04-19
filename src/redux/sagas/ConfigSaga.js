import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getConfig(actions) {
  try {
    const res = yield API.get('getConfigApp', actions.params);
    yield put({type: _onSuccess(Actions.GET_CONFIG), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_CONFIG)});
    hanldeError(error);
  }
}

export function* watchConfigSagas() {
  yield takeLatest(Actions.GET_CONFIG, getConfig);
}

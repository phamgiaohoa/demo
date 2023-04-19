import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getLocation(actions) {
  try {
    const res = yield API.get('getLocation', actions.params);
    yield put({type: _onSuccess(Actions.GET_LOCATION), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_LOCATION)});
    hanldeError(error);
  }
}

export function* watchLocationSagas() {
  yield takeLatest(Actions.GET_LOCATION, getLocation);
}

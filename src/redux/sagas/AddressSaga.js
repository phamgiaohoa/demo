import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import queryString from 'query-string';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getAddress(actions) {
  try {
    const res = yield API.get('getAddressBook', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_ADDRESS),
      data: Object.values(res.data),
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_ADDRESS)});
    hanldeError(error);
  }
}

function* addAddress(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('addAddressBook', body, actions.params);
    yield put({
      type: _onSuccess(Actions.ADD_ADDRESS),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.ADD_ADDRESS)});
    hanldeError(error);
  }
}

function* deleteAddress(actions) {
  try {
    const res = yield API.get('deleteAddressBook', actions.params);
    yield put({
      type: _onSuccess(Actions.DELETE_ADDRESS),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.DELETE_ADDRESS)});
    hanldeError(error);
  }
}

function* updateAddress(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('updateAddressBook', body, actions.params);
    yield put({
      type: _onSuccess(Actions.UPDATE_ADDRESS),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.UPDATE_ADDRESS)});
    hanldeError(error);
  }
}

export function* watchAddressSagas() {
  yield takeLatest(Actions.GET_ADDRESS, getAddress);
  yield takeLatest(Actions.ADD_ADDRESS, addAddress);
  yield takeLatest(Actions.DELETE_ADDRESS, deleteAddress);
  yield takeLatest(Actions.UPDATE_ADDRESS, updateAddress);
}

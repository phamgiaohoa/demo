import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getPageByID(actions) {
  try {
    const res = yield API.get('getPageByID', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_PAGE_BY_ID),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PAGE_BY_ID)});
    hanldeError(error);
  }
}

export function* watchPageByIDSagas() {
  yield takeLatest(Actions.GET_PAGE_BY_ID, getPageByID);
}

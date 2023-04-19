import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getBanner(actions) {
  try {
    const res = yield API.get(
      'getBannerByID?banner_id=app-banner-main,app-banner-home-1,app-banner-home-2',
      actions.params,
    );
    yield put({type: _onSuccess(Actions.GET_BANNER), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_BANNER)});
    hanldeError(error);
  }
}

export function* watchBannerSagas() {
  yield takeLatest(Actions.GET_BANNER, getBanner);
}

import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import queryString from 'query-string';
import {put, select, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getNotification(actions) {
  try {
    const res = yield API.get('getNotification', actions.params);
    yield put({
      type: _onSuccess(actions.type),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(actions.type)});
    hanldeError(error);
  }
}

function* updateNotify(actions) {
  try {
    const state = yield select();
    const body = queryString.stringify(actions.body);
    const res = yield API.post('updateNotification', body, actions.params);
    yield put({type: _onSuccess(Actions.UPDATE_NOTIFICATION), data: res.data});
    yield put({
      type: Actions.GET_TOTAL_NOTIFICATION,
      params: {
        user: state.tokenUser.data,
        type: 'reading',
      },
    });
  } catch (error) {
    yield put({type: _onFail(Actions.UPDATE_NOTIFICATION)});
    hanldeError(error);
  }
}

function* getTotalNotify(actions) {
  try {
    const res = yield API.get('getNotification', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_TOTAL_NOTIFICATION),
      data: res.total,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_TOTAL_NOTIFICATION)});
    hanldeError(error);
  }
}

function* getNotificationDetails(actions) {
  try {
    const res = yield API.get('getNotification', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_NOTIFICATION_DETAILS),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_NOTIFICATION_DETAILS)});
    hanldeError(error);
  }
}

export function* watchNotificationSagas() {
  yield takeLatest(Actions.GET_NOTIFICATION_GENERAL, getNotification);
  yield takeLatest(Actions.GET_NOTIFICATION_PERSONAL, getNotification);
  yield takeLatest(Actions.GET_NOTIFICATION_PROMOTION, getNotification);
  yield takeLatest(Actions.UPDATE_NOTIFICATION, updateNotify);
  yield takeLatest(Actions.GET_TOTAL_NOTIFICATION, getTotalNotify);
  yield takeLatest(Actions.GET_NOTIFICATION_DETAILS, getNotificationDetails);
}

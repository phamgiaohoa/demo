import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getNews(actions) {
  try {
    const res = yield API.get('getNews', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_NEWS),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_NEWS)});
    hanldeError(error);
  }
}

function* getNewsDetail(actions) {
  try {
    const res = yield API.get('getNews', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_NEWS_DETAIL),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_NEWS_DETAIL)});
    hanldeError(error);
  }
}

export function* watchNewsSagas() {
  yield takeLatest(Actions.GET_NEWS, getNews);
  yield takeLatest(Actions.GET_NEWS_DETAIL, getNewsDetail);
}

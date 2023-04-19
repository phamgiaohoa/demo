import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getDiscount(actions) {
  try {
    const res = yield API.get('getPromotionUser?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_DISCOUNT),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
      total: res.total,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_DISCOUNT)});
    hanldeError(error);
  }
}
export function* watchDiscount() {
  yield takeLatest(Actions.GET_DISCOUNT, getDiscount);
}

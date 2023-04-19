import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {CustomToast} from '@utils/helper';
import queryString from 'query-string';
import {put, takeLatest, select} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getcommission(actions) {
  try {
    const res = yield API.get('getCommission?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_COMMISSION),
      data: res.data,
      info: res.info,
      lang: res.lang,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_COMMISSION)});
    hanldeError(error);
  }
}

function* Swap_Commission(actions) {
  const body = queryString.stringify(actions.body);
  try {
    const res = yield API.post('swapCommission', body, actions.params);

    yield put({
      type: _onSuccess(Actions.SWAP_COMMISSION),
      data: res.token,
    });
    yield put({
      type: Actions.GET_COMMISSION,
      params: {
        user: actions.params.user,
        p: 1,
      },
    });
    CustomToast('Yêu cầu của bạn đã thành công');
  } catch (error) {
    yield put({type: _onFail(Actions.SWAP_COMMISSION)});
    hanldeError(error);
  }
}

function* swapCommissionLog(actions) {
  try {
    const res = yield API.get('swapCommissionLog', actions.params);
    yield put({
      type: _onSuccess(Actions.SWAP_COMMISSION_LOG),
      data: res.data,
      info: res.info,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.SWAP_COMMISSION_LOG)});
    hanldeError(error);
  }
}

function* getUserWcoinLog(actions) {
  try {
    const user = yield select(state => state.tokenUser.data);
    const res = yield API.get('getUserWcoinLog', {...actions.params, user});
    yield put({
      type: _onSuccess(Actions.GET_USER_WCOIN_LOG),
      data: res.data,
      info: res.info,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_USER_WCOIN_LOG)});
    hanldeError(error);
  }
}

export function* watchCommissionSagas() {
  yield takeLatest(Actions.GET_COMMISSION, getcommission);
  yield takeLatest(Actions.SWAP_COMMISSION_LOG, swapCommissionLog);
  yield takeLatest(Actions.SWAP_COMMISSION, Swap_Commission);
  yield takeLatest(Actions.GET_USER_WCOIN_LOG, getUserWcoinLog);
}

import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import queryString from 'query-string';
import {call, put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

function* signupAffiliate(actions) {
  try {
    const res = yield API.postFormData(
      `requestUserAffiliates?user=${actions.user}`,
      actions.formData,
    );
    yield put({type: _onSuccess(Actions.SIGNUP_AFFILIATE), data: res.data});
    yield call(() => actions.onFinish);
  } catch (error) {
    yield put({type: _onFail(Actions.SIGNUP_AFFILIATE)});
    hanldeError(error);
  }
}

function* addDeepLink(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('addDeeplink', body, actions.params);
    yield put({type: _onSuccess(Actions.ADD_DEEP_LINK), data: res.data});
    yield put({type: _onUnmount(Actions.GET_DEEP_LINK)});
    yield put({
      type: Actions.GET_DEEP_LINK,
      params: {
        user: actions.params.user,
        p: 1,
      },
    });
  } catch (error) {
    yield put({type: _onFail(Actions.ADD_DEEP_LINK)});
    hanldeError(error);
  }
}

function* getDeepLink(actions) {
  try {
    const res = yield API.get('getDeeplink?numshow=12', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_DEEP_LINK),
      data: res.data,
      totalPage: res.total_page,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_DEEP_LINK)});
    hanldeError(error);
  }
}

function* deleteDeepLink(actions) {
  const {user, id} = actions.params;

  try {
    yield API.delete(`addDeeplink?user=${user}&id=${id}`);
    yield put({
      type: _onSuccess(Actions.DELETE_DEEP_LINK),
    });
    yield put({
      type: Actions.GET_DEEP_LINK,
      params: {
        user: actions.params.user,
        p: 1,
      },
    });
  } catch (error) {
    yield put({type: _onFail(Actions.DELETE_DEEP_LINK)});
    hanldeError(error);
  }
}

function* getListReferredPeople(actions) {
  try {
    const res = yield API.get('getRecommendUser', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_LIST_REFERRED_PEOPLE),
      data: res.data,
      totalPage: res.total_page,
      totalCommission: res.total_commission,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_LIST_REFERRED_PEOPLE)});
    hanldeError(error);
  }
}

function* getReferredOrderList(actions) {
  try {
    const res = yield API.get('getOrderRecommendUser', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_REFERRED_ORDER),
      data: res.data,
      totalPage: res.total_page,
      totalCommission: res.total_commission,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_REFERRED_ORDER)});
    hanldeError(error);
  }
}

function* getListReferredOrderList(actions) {
  try {
    const res = yield API.get('getOrderRecommendUser', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_REFERRED_ORDER_DETAILS),
      data: res.data,
      totalPage: res.total_page,
      info: res.info,
      totalCommission: res.total_commission,
      isLoadMore: actions.isLoadMore,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_REFERRED_ORDER_DETAILS)});
    hanldeError(error);
  }
}

function* addUserRecommend(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('addUserRecommend', body, actions.params);
    yield put({
      type: _onSuccess(Actions.ADD_USER_RECOMMEND),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.ADD_USER_RECOMMEND)});
    hanldeError(error);
  }
}

export function* watchAffiliateSagas() {
  yield takeLatest(Actions.SIGNUP_AFFILIATE, signupAffiliate);
  yield takeLatest(Actions.ADD_DEEP_LINK, addDeepLink);
  yield takeLatest(Actions.GET_DEEP_LINK, getDeepLink);
  yield takeLatest(Actions.DELETE_DEEP_LINK, deleteDeepLink);
  yield takeLatest(Actions.GET_LIST_REFERRED_PEOPLE, getListReferredPeople);
  yield takeLatest(Actions.ADD_USER_RECOMMEND, addUserRecommend);
  yield takeLatest(Actions.GET_REFERRED_ORDER, getReferredOrderList);
  yield takeLatest(
    Actions.GET_REFERRED_ORDER_DETAILS,
    getListReferredOrderList,
  );
}

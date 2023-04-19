import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getGroupCategory(actions) {
  try {
    const res = yield API.get('getProductGroup', actions.params);
    yield put({type: _onSuccess(Actions.GET_GROUP_CATEGORY), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_GROUP_CATEGORY)});
    hanldeError(error);
  }
}

function* getChildGroupCategory(actions) {
  try {
    const res = yield API.get('getProductGroup', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_CHILD_GROUP_CATEGORY),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_CHILD_GROUP_CATEGORY)});
    hanldeError(error);
  }
}

function* getGroupSubCategory(actions) {
  try {
    const res = yield API.get('getProductGroup', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_GROUP_SUB_CATEGORY),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_GROUP_SUB_CATEGORY)});
    hanldeError(error);
  }
}

export function* watchCategorySagas() {
  yield takeLatest(Actions.GET_GROUP_CATEGORY, getGroupCategory);
  yield takeLatest(Actions.GET_CHILD_GROUP_CATEGORY, getChildGroupCategory);
  yield takeLatest(Actions.GET_GROUP_SUB_CATEGORY, getGroupSubCategory);
}

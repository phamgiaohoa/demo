import {goBack} from '@navigation/RootNavigation';
import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {CustomToast} from '@utils/helper';
import Storage from '@utils/storage';
import I18n from 'i18n';
import queryString from 'query-string';
import {call, put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess, _onUnmount} from '../actions';

function* login(actions) {
  const body = queryString.stringify(actions.body);

  try {
    const res = yield API.post('signinUser', body);
    yield put({type: _onSuccess(Actions.LOGIN_ACCOUNT), data: res.token});
    yield put({type: Actions.TOKEN_USER, data: res.token});
    yield put({
      type: Actions.GET_USER_INFORMATION,
      params: {user: res.token},
    });
  } catch (error) {
    yield put({type: _onFail(Actions.LOGIN_ACCOUNT)});
    hanldeError(error);
  }
}

function* signUp(actions) {
  const body = queryString.stringify(actions.body);

  try {
    const res = yield API.post('signupUser', body);
    yield put({type: _onSuccess(Actions.SIGNUP_ACCOUNT), data: res.token});
    yield put({type: Actions.TOKEN_USER, data: res.token});
    yield put({
      type: Actions.GET_USER_INFORMATION,
      params: {user: res.token},
    });
  } catch (error) {
    yield put({type: _onFail(Actions.SIGNUP_ACCOUNT)});
    hanldeError(error);
  }
}

function* getUser(actions) {
  try {
    const res = yield API.get('getUser', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_USER_INFORMATION),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_USER_INFORMATION)});
    hanldeError(error);
  }
}

function* updateUser(actions) {
  try {
    const res = yield API.postFormData(
      `updateUser?user=${actions.user}`,
      actions.formData,
    );
    yield put({
      type: _onSuccess(Actions.UPDATE_USER_INFORMATION),
      data: res.data,
    });
    yield put({
      type: Actions.GET_USER_INFORMATION,
      params: {
        user: actions.user,
      },
    });
    CustomToast(I18n.t('handleError.account_update'));
    yield actions.goBack && call(() => goBack());
  } catch (error) {
    yield put({type: _onFail(Actions.UPDATE_USER_INFORMATION)});
    hanldeError(error);
  }
}

function* logOut(actions) {
  try {
    yield API.get('logoutUser', actions.params);
    yield put({type: _onSuccess(Actions.LOGOUT_ACCOUNT)});
    yield put({type: _onUnmount(Actions.GET_USER_INFORMATION)});
    yield put({type: _onUnmount(Actions.TOKEN_USER)});
    Storage.removeItem('TOKEN_USER');
  } catch (error) {
    yield put({type: _onFail(Actions.LOGOUT_ACCOUNT)});
    hanldeError(error);
  }
}

function* updatePassUser(actions) {
  try {
    const body = queryString.stringify(actions.body);
    yield API.post('updatePassword', body, actions.params);
    yield put({type: _onSuccess(Actions.UPDATE_PASS_USER)});
  } catch (error) {
    yield put({type: _onFail(Actions.UPDATE_PASS_USER)});
    hanldeError(error);
  }
}

function* forgetPasUser(actions) {
  try {
    const res = yield API.get('fogetPassword', actions.params);
    yield put({type: _onSuccess(Actions.FORGOT_PASS_USER), data: res.code});
  } catch (error) {
    yield put({type: _onFail(Actions.FORGOT_PASS_USER)});
    hanldeError(error);
  }
}

export function* watchUserSagas() {
  yield takeLatest(Actions.LOGIN_ACCOUNT, login);
  yield takeLatest(Actions.SIGNUP_ACCOUNT, signUp);
  yield takeLatest(Actions.GET_USER_INFORMATION, getUser);
  yield takeLatest(Actions.UPDATE_USER_INFORMATION, updateUser);
  yield takeLatest(Actions.LOGOUT_ACCOUNT, logOut);
  yield takeLatest(Actions.UPDATE_PASS_USER, updatePassUser);
  yield takeLatest(Actions.FORGOT_PASS_USER, forgetPasUser);
}

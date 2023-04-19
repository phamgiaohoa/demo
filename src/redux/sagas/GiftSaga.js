import {goBack, navigate} from '@navigation/RootNavigation';
import {routes} from '@navigation/routes';
import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {width} from '@utils/responsive';
import I18n from 'i18n';
import queryString from 'query-string';
import {call, put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getUserGift(actions) {
  try {
    const res = yield API.get('getUserGift', actions.params);
    yield put({type: _onSuccess(Actions.GET_USER_GIFT), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_USER_GIFT)});
    hanldeError(error);
  }
}

function* getUserGiftDetails(actions) {
  try {
    const res = yield API.get('getUserGift', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_USER_GIFT_DETAILS),
      data: res.list_gift,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_USER_GIFT_DETAILS)});
    hanldeError(error);
  }
}

function* confirmUserGift(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('confirmUserGift', body, actions.params);
    yield put({type: _onSuccess(Actions.CONFIRM_USER_GIFT), data: res.data});
    yield goBack();
  } catch (error) {
    yield put({type: _onFail(Actions.CONFIRM_USER_GIFT)});
    hanldeError(error);
  }
}

function* checkUserGift(actions) {
  try {
    const res = yield API.get('checkUserGift', actions.params);
    yield put({type: _onSuccess(Actions.CHECK_USER_GIFT), data: res.data});
    yield call(() => {
      if (
        res?.error?.error_description === 'Bạn chưa chọn quà chương trình này'
      ) {
        navigate(routes.MY_GIFT_DETAILS, actions.item);
      } else {
        navigate(routes.ALERT_BOX, {
          title: I18n.t('cartScreen.titleModal'),
          content: res.data,
          isConfirm: false,
          contentStyles: {
            width: width - 24,
          },
          textStyles: {
            textAlign: 'left',
          },
        });
      }
    });
  } catch (error) {
    yield put({type: _onFail(Actions.CHECK_USER_GIFT)});
    hanldeError(error);
  }
}

export function* watchGiftSagas() {
  yield takeLatest(Actions.GET_USER_GIFT, getUserGift);
  yield takeLatest(Actions.GET_USER_GIFT_DETAILS, getUserGiftDetails);
  yield takeLatest(Actions.CONFIRM_USER_GIFT, confirmUserGift);
  yield takeLatest(Actions.CHECK_USER_GIFT, checkUserGift);
}

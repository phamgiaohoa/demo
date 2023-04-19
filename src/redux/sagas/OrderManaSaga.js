import {navigate} from '@navigation/RootNavigation';
import {routes} from '@navigation/routes';
import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import {call, put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getOrder(actions) {
  try {
    const res = yield API.get('getOrder', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_ORDER),
      data: res.data,
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_ORDER)});
    hanldeError(error);
  }
}

function* getOrderDetails(actions) {
  try {
    const res = yield API.get('getOrder', actions.params);
    yield put({type: _onSuccess(Actions.GET_ORDER_DETAILS), data: res.data});

    const item = res.data[0];
    const cart = item.list_detail;
    const orderDetails = {
      total_order: item.total_order,
      shipping_price: item.shipping_price,
      promotion_price: item.promotion_price,
      payment_wcoin2money: item.payment_wcoin2money,
      total_payment: item.total_payment,
    };
    const orderShip = {
      shipping_id: '',
      title: item.shipping,
    };
    const orderMethod = {
      method_id: '',
      title: item.method,
    };
    const address = {
      full_name: item.o_full_name,
      phone: item.o_phone,
      address: item.o_address,
      ward_text: item.o_ward,
      district_text: item.o_district,
      province_text: item.o_province,
    };
    yield call(() =>
      navigate(routes.PAYMENT_SCREEN, {
        address,
        orderShip,
        orderMethod,
        cart,
        orderDetails,
      }),
    );
  } catch (error) {
    yield put({type: _onFail(Actions.GET_ORDER_DETAILS)});
    hanldeError(error);
  }
}

export function* watchOrderManaSagas() {
  yield takeLatest(Actions.GET_ORDER, getOrder);
  yield takeLatest(Actions.GET_ORDER_DETAILS, getOrderDetails);
}

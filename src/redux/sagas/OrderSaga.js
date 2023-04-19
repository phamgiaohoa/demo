import {navigate} from '@navigation/RootNavigation';
import {routes} from '@navigation/routes';
import API from '@utils/api';
import {hanldeError} from '@utils/handleError';
import queryString from 'query-string';
import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';

function* getOrderShip(actions) {
  try {
    const res = yield API.get('getOrderShipping', actions.params);
    yield put({type: _onSuccess(Actions.GET_ORDER_SHIP), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_ORDER_SHIP)});
    hanldeError(error);
  }
}

function* getOrderMethod(actions) {
  try {
    const res = yield API.get('getOrderMethod', actions.params);
    yield put({
      type: _onSuccess(Actions.GET_ORDER_METHOD),
      data: Object.values(res.data),
    });
  } catch (error) {
    yield put({type: _onFail(Actions.GET_ORDER_METHOD)});
    hanldeError(error);
  }
}

function* getPriceShip(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('getPriceShipping', body);
    yield put({type: _onSuccess(Actions.GET_PRICE_SHIP), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRICE_SHIP)});
    hanldeError(error);
  }
}

function* orderComplete(actions) {
  try {
    const body = queryString.stringify(actions.body);
    const res = yield API.post('orderComplete', body, actions.params);
    yield put({type: _onSuccess(Actions.ORDER_COMPLETE), data: res.data});
  } catch (error) {
    error?.data.code === 444 &&
      (yield put({
        type: _onSuccess(Actions.ORDER_COMPLETE_EXPIRED),
        data: error?.data,
      }));

    if (error?.data.code === 443) {
      let arrayCart = actions.carts.cart;

      if (actions.params.user) {
        for (let i = 0; i < error?.data?.data.length; i++) {
          yield put({
            type: Actions.UPDATE_CART,
            params: actions.params,
            body: {
              item_id: error?.data.data[i].item_id,
              option_id: error?.data.data[i].option_id,
              quantity: 0,
            },
          });
        }
        yield navigate(routes.CART_SCREEN);
      }

      if (actions.params.user === null) {
        for (let i = 0; i < error?.data?.data.length; i++) {
          const filterCart = arrayCart?.filter(
            value => value?.item_id !== error?.data?.data[i].item_id,
          );
          arrayCart = filterCart;
        }
        yield put({
          type: _onSuccess(Actions.GET_CART),
          data: arrayCart,
        });
        yield navigate(routes.CART_SCREEN);
      }
    }

    yield put({type: _onFail(Actions.ORDER_COMPLETE)});
    hanldeError(error);
  }
}

function* getOrderStatus(actions) {
  try {
    const res = yield API.get('getOrderStatus', actions.params);
    yield put({type: _onSuccess(Actions.GET_ORDER_STATUS), data: res.data});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_ORDER_STATUS)});
    hanldeError(error);
  }
}

export function* watchOrderSagas() {
  yield takeLatest(Actions.GET_ORDER_SHIP, getOrderShip);
  yield takeLatest(Actions.GET_ORDER_METHOD, getOrderMethod);
  yield takeLatest(Actions.GET_PRICE_SHIP, getPriceShip);
  yield takeLatest(Actions.ORDER_COMPLETE, orderComplete);
  yield takeLatest(Actions.GET_ORDER_STATUS, getOrderStatus);
}

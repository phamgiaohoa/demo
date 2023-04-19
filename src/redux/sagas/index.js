import {all, fork} from 'redux-saga/effects';
import {watchAddressSagas} from './AddressSaga';
import {watchAffiliateSagas} from './AffiliateSaga';
import {watchBannerSagas} from './BannerSaga';
import {watchCartSagas} from './CartSaga';
import {watchCategorySagas} from './CategorySaga';
import {watchUseWCoinSagas} from './CoinSaga';
import {watchCommissionSagas} from './CommissionSaga';
import {watchConfigSagas} from './ConfigSaga';
import {watchDiscount} from './CouponSaga';
import {watchGiftSagas} from './GiftSaga';
import {watchLocationSagas} from './LocationSaga';
import {watchNewsSagas} from './NewsSaga';
import {watchNotificationSagas} from './NotificationSaga';
import {watchOrderManaSagas} from './OrderManaSaga';
import {watchOrderSagas} from './OrderSaga';
import {watchPageByIDSagas} from './PageByIDSaga';
import {watchProductSagas} from './ProductSaga';
import {watchPromotionSagas} from './PromotionSaga';
import {watchSocialLoginSagas} from './SocialLoginSaga';
import {watchTokenSagas} from './TokenSaga';
import {watchUserSagas} from './UserSaga';

export default function* rootSaga() {
  yield all([
    fork(watchAddressSagas),
    fork(watchBannerSagas),
    fork(watchCategorySagas),
    fork(watchConfigSagas),
    fork(watchNewsSagas),
    fork(watchPageByIDSagas),
    fork(watchProductSagas),
    fork(watchPromotionSagas),
    fork(watchTokenSagas),
    fork(watchUserSagas),
    fork(watchPageByIDSagas),
    fork(watchSocialLoginSagas),
    fork(watchLocationSagas),
    fork(watchOrderSagas),
    fork(watchNotificationSagas),
    fork(watchUseWCoinSagas),
    fork(watchOrderManaSagas),
    fork(watchDiscount),
    fork(watchAffiliateSagas),
    fork(watchCommissionSagas),
    fork(watchCartSagas),
    fork(watchGiftSagas),
  ]);
}

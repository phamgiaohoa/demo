import {combineReducers} from 'redux';
import {AddressReducer} from './AddressReducer';
import {AffiliateReducer} from './AffiliateReducer';
import {BannerReducer} from './BannerReducer';
import {CartReducer} from './CartReducer';
import {CategoryReducer} from './CategoryReducer';
import {CoinReducer} from './CoinReducer';
import {CommissionReducer} from './CommissionReducer';
import {ConfigReducer} from './ConfigReducer';
import {DiscountReducer} from './CouponReducer';
import {DeviceReducer} from './DeviceReducer';
import {GeneralReducer} from './GeneralReducer';
import {GiftReducer} from './GiftReducer';
import {LocationReducer} from './LocationReducer';
import {NewsReducer} from './NewsReducer';
import {NotificationReducer} from './NotificationReducer';
import {OrderManaReducer} from './OrderManaReducer';
import {OrderReducer} from './OrderReducer';
import {PageByIDReducer} from './PageByIDReducer';
import {ProductReducer} from './ProductReducer';
import {PromotionReducer} from './PromotionReducer';
import {SocialLoginReducer} from './SocialLoginReducer';
import {TokenReducer} from './TokenReducer';
import {UserReducer} from './UserReducer';

const rootReducer = combineReducers({
  ...GeneralReducer,
  ...TokenReducer,
  ...UserReducer,
  ...ConfigReducer,
  ...BannerReducer,
  ...NewsReducer,
  ...PromotionReducer,
  ...ProductReducer,
  ...CategoryReducer,
  ...PageByIDReducer,
  ...CartReducer,
  ...AddressReducer,
  ...SocialLoginReducer,
  ...LocationReducer,
  ...OrderReducer,
  ...NotificationReducer,
  ...DeviceReducer,
  ...CoinReducer,
  ...OrderManaReducer,
  ...DiscountReducer,
  ...AffiliateReducer,
  ...CommissionReducer,
  ...GiftReducer,
});

export default rootReducer;

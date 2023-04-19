import CategoryScreen from './CategoryScreen';
import AllProductScreen from './CategoryScreen/AllProductScreen';
import HomeScreen from './HomeScreen';
import CategoryDetail from './HomeScreen/navigation/CategoryDetails';
import ListProductHome from './HomeScreen/navigation/ListProduct';
import NewsScreen from './NewsScreen';
import NewsDetailsScreen from './NewsScreen/NewsDetailsScreen';
import NotificationScreen from './NotificationScreen';
import NotificationDetailsScreen from './NotificationScreen/navigation/NotificationDetailsScreen';
import ProfileScreen from './ProfileScreen';
import AccountAffiliate from './ProfileScreen/navigation/AccountAffiliate';
import CommissionManagement from './ProfileScreen/navigation/CommissionManagement';
import DiscountManagement from './ProfileScreen/navigation/DiscountManagement';
import EditProfile from './ProfileScreen/navigation/EditProfile';
import EvaluateManagement from './ProfileScreen/navigation/EvaluateManagement';
import ListProduct from './ProfileScreen/navigation/ListProduct';
import ListReferredPeople from './ProfileScreen/navigation/ListReferredPeople';
import MyGift from './ProfileScreen/navigation/MyGift';
import MyGiftDetails from './ProfileScreen/navigation/MyGiftDetails';
import OrderManagement from './ProfileScreen/navigation/OrderManagement';
import PointRewardManagement from './ProfileScreen/navigation/PointRewardManagement';
import PointSwapHistory from './ProfileScreen/navigation/PointSwapHistory';
import OrderList from './ProfileScreen/navigation/ListReferredPeople/components/OrderList';
import OrderListDetails from './ProfileScreen/navigation/ListReferredPeople/components/OrderListDetails';

export const bottom = {
  HOME_SCREEN: HomeScreen,
  CATEGORY_SCREEN: CategoryScreen,
  NEWS_SCREEN: NewsScreen,
  NOTIFICATION_SCREEN: NotificationScreen,
  PROFILE_SCREEN: ProfileScreen,
  NEWS_DETAILS_SCREEN: NewsDetailsScreen,
  ALL_PRODUCT_SCREEN: AllProductScreen,
  NOTIFICATION_DETAILS_SCREEN: NotificationDetailsScreen,
  CATEGORY_DETAIL: CategoryDetail,
  LIST_PRODUCT: ListProduct,
  ORDER_MANAGEMENT: OrderManagement,
  LIST_PRODUCT_HOME: ListProductHome,
  EDIT_PROFILE: EditProfile,
  DISCOUNT_MANAGEMENT: DiscountManagement,
  COMMISSION_MANAGEMENT: CommissionManagement,
  ACCOUNT_AFFILIATE: AccountAffiliate,
  EVALUATE_MANAGEMENT: EvaluateManagement,
  MY_GIFT: MyGift,
  MY_GIFT_DETAILS: MyGiftDetails,
  POINT_REWARD_MANAGEMENT: PointRewardManagement,
  POINT_SWAP_HISTORY: PointSwapHistory,
  REFERRED_PEOPLE: ListReferredPeople,
  REFERRED_ORDER: OrderList,
  REFERRED_ORDER_DETAILS: OrderListDetails,
};

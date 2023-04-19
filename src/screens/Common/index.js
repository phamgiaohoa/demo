import AlertBox from './AlertBox';
import CartScreen from './Cart/CartScreen';
import ConfirmScreen from './Cart/ConfirmScreen';
import AddressDetails from './Cart/ConfirmScreen/navigation/AddressDetails';
import PaymentScreen from './Cart/PaymentScreen';
import SuccessScreen from './Cart/SuccessScreen';
import ProductDetail from './ProductDetails';
import CommentDetails from './ProductDetails/components/EvaluateProrduct/navigation/CommentDetails';
import InformationDetails from './ProductDetails/components/InformationProduct/InformationDetails';
import SearchScreen from './SearchScreen';
import SearchDetailsScreen from './SearchScreen/navigation/SearchDetailsScreen';
import LightBox from './LightBox';
import VNPayScreen from './Cart/VNPayScreen';

export const common = {
  CART_SCREEN: CartScreen,
  CONFIRM_SCREEN: ConfirmScreen,
  PAYMENT_SCREEN: PaymentScreen,
  SUCCESS_SCREEN: SuccessScreen,
  PRODUCT_DETAIL: ProductDetail,
  INFORMATION_DETAILS: InformationDetails,
  ALERT_BOX: AlertBox,
  ADDRESS_DETAILS: AddressDetails,
  COMMENT_DETAILS: CommentDetails,
  SEARCH_SCREEN: SearchScreen,
  SEARCH_DETAILS_SCREEN: SearchDetailsScreen,
  LIGHT_BOX: LightBox,
  VNPAY_SCREEN: VNPayScreen,
};

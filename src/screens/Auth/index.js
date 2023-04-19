import AuthContainer from './AuthContainer';
import LoginScreen from './AuthContainer/LoginScreen';
import SignUpScreen from './AuthContainer/SignUpScreen';
import ForgotPassScreen from './AuthContainer/ForgotPassScreen';

export const auth = {
  LOGIN_SCREEN: LoginScreen,
  SIGNUP_SCREEN: SignUpScreen,
  AUTH_CONTAINER: AuthContainer,
  FORGOT_PASS_SCREEN: ForgotPassScreen,
};

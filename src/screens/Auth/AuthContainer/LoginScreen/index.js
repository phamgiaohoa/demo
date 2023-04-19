import {icons} from '@assets';
import {Block, Loading, Text} from '@components';
import LoginSocialButton from '@components/Common/ItemList/LoginSocialButton';
import {theme} from '@theme';
import {height} from '@utils/responsive';
import {Formik} from 'formik';
import {useSocialLogin} from 'hooks';
import I18n from 'i18n';
import React, {useEffect} from 'react';
import {Keyboard, Platform, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'redux/actions';
import LoginForm from './components/LoginForm';
import {loginValidate} from './validation';

const INITIAL_VALUES = {username: '', password: ''};

const LoginScreen = ({callback}) => {
  const dispatch = useDispatch();
  const {device_token, device_name} = useSelector(state => state.device);
  const {isLoading} = useSelector(state => state.login);
  const {
    data,
    fetching,
    handleLoginFacebook,
    handleLoginGoogle,
    handleLoginApple,
  } = useSocialLogin();

  const _onSubmit = values => {
    Keyboard.dismiss();
    dispatch({
      type: actions.LOGIN_ACCOUNT,
      body: {
        username: values.username,
        password: values.password,
        device_token,
        device_name,
      },
    });
  };

  useEffect(() => {
    try {
      if (data) {
        const {value, type} = data;
        if (value) {
          if (type === 'facebook') {
            dispatch({
              type: actions.LOGIN_FACEBOOK,
              body: {
                info: JSON.stringify(value),
                fbID: value.id,
                device_token,
                device_name,
              },
            });
          } else if (type === 'google') {
            dispatch({
              type: actions.LOGIN_GOOGLE,
              body: {
                info: JSON.stringify({user: value.user}),
                ggID: value.user.id,
                device_token,
                device_name,
              },
            });
          } else if (type === 'apple') {
            dispatch({
              type: actions.LOGIN_APPLE,
              body: {
                info: JSON.stringify(value),
                apID: value.sub,
                device_token,
                device_name,
              },
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [data, device_name, device_token, dispatch]);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={_onSubmit}
      validationSchema={loginValidate}>
      <Block
        backgroundColor="background"
        marginTop={height / 4}
        marginHorizontal={20}
        borderRadius={20}
        marginBottom={20}>
        <Block backgroundColor="white" radius={8}>
          <Block alignCenter marginTop={30}>
            <Text size={18} fontType="semibold">
              {I18n.t('loginScreen.login')}
            </Text>
            <Text color={theme.colors.gray} marginTop={15}>
              {I18n.t('loginScreen.welcome')}
            </Text>
          </Block>
          <LoginForm isLoading={isLoading} />
          <Text size={12} center color={theme.colors.black}>
            {I18n.t('loginScreen.orLogin')}
          </Text>
          <Block alignCenter marginHorizontal={16} marginVertical={16}>
            <LoginSocialButton
              title="Sign in with Facebook"
              backgroundColor="#4267b2"
              color="white"
              icon={icons.facebook}
              disabled={isLoading}
              onPress={handleLoginFacebook}
            />
            <LoginSocialButton
              title="Sign in with Google"
              backgroundColor="#FFFFFF"
              color="black"
              icon={icons.google}
              disabled={isLoading}
              onPress={handleLoginGoogle}
            />
            {Platform.OS === 'ios' ? (
              <LoginSocialButton
                title="Sign in with Apple"
                backgroundColor="#000000"
                color="white"
                icon={icons.apple}
                disabled={isLoading}
                onPress={handleLoginApple}
              />
            ) : null}
          </Block>
          <Block row alignCenter justifyCenter paddingBottom={16}>
            <Text center size={12}>
              {I18n.t('loginScreen.haveAccount')}{' '}
            </Text>
            <Pressable onPress={callback}>
              <Text size={12} color="blue" fontType="semibold">
                {I18n.t('loginScreen.register')}
              </Text>
            </Pressable>
          </Block>
        </Block>
        {fetching && <Loading />}
      </Block>
    </Formik>
  );
};

export default LoginScreen;

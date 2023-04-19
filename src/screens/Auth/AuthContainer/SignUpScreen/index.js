import {Block, Text} from '@components';
import {theme} from '@theme';
import {height} from '@utils/responsive';
import {Formik} from 'formik';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {Keyboard, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'redux/actions';
import PolicyModal from './components/PolicyModal';
import SignUpForm from './components/SignUpForm';
import {signUpValidate} from './validation';

const INITIAL_VALUES = {
  full_name: '',
  email: '',
  phone: '',
  password: '',
  rePassword: '',
  referral_code: '',
};

const SignUpScreen = ({invitation_code, callback}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.page);
  const {isLoading} = useSelector(state => state.signUp);
  const [modalPolicy, setModalPolicy] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState(false);

  useEffect(() => {
    dispatch({
      type: actions.GET_PAGE_BY_ID,
      params: {
        item_id: '1',
      },
    });
  }, [dispatch]);

  const _onSubmit = values => {
    Keyboard.dismiss();
    dispatch({
      type: actions.SIGNUP_ACCOUNT,
      body: {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        referral_code: values.referral_code,
        invitation_code,
      },
    });
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={_onSubmit}
      validationSchema={signUpValidate}>
      <Block
        marginTop={height / 4}
        borderRadius={20}
        marginBottom={20}
        marginHorizontal={20}
        opacity={modalPolicy ? 0 : 1}>
        <Block backgroundColor="white" radius={8}>
          <Block alignCenter marginTop={30}>
            <Text size={18} fontType="bold">
              {I18n.t('signUpScreen.register')}
            </Text>
            <Text color={theme.colors.gray} marginTop={15}>
              {I18n.t('signUpScreen.welcome')}
            </Text>
          </Block>
          <SignUpForm
            isLoading={isLoading}
            checkPolicy={checkPolicy}
            setModalPolicy={() => {
              setModalPolicy(true);
            }}
          />
          <Block row alignCenter justifyCenter paddingBottom={16}>
            <Text center size={12}>
              {I18n.t('signUpScreen.haveAccount')}{' '}
            </Text>
            <Pressable onPress={callback}>
              <Text size={12} color="blue" fontType="semibold">
                {I18n.t('signUpScreen.login')}
              </Text>
            </Pressable>
          </Block>
          <PolicyModal
            visible={modalPolicy}
            data={data?.content}
            onPress={() => {
              setModalPolicy(false);
              setCheckPolicy(true);
            }}
          />
        </Block>
      </Block>
    </Formik>
  );
};

export default SignUpScreen;

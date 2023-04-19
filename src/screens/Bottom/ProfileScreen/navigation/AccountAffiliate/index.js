import {Block, Header, Loading} from '@components';
import actions from '@redux/actions';
import {Formik} from 'formik';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FormAffiliate from './components/FormAffiliate';
import FormProcessing from './components/FormProcessing';
import ListDeepLink from './components/ListDeepLink';
import validation from './validation';

export const INITIAL_VALUES = {
  full_name: '',
  phone: '',
  email: '',
  birthday: '',
  address: '',
  province: '',
  district: '',
  ward: '',
  bank_account_owner: '',
  bank_account_number: '',
  bank_name: '',
  bank_branch: '',
  picture_list: [],
};

const AccountAffiliate = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(null); // type => SIGNUP, PROCESSING, SUCCESS
  const [isSelectCity, setIsSelectCity] = useState(false);
  const user = useSelector(state => state.tokenUser.data);
  const userInfo = useSelector(state => state.userInfo.data);
  const isUserInfo = useSelector(state => state.userInfo.isLoading);

  useEffect(() => {
    dispatch({
      type: actions.GET_USER_INFORMATION,
      params: {
        user,
      },
    });
  }, [dispatch, user]);

  useEffect(() => {
    if (
      userInfo?.is_request_affiliates === '1' &&
      userInfo?.is_affiliates === '0'
    ) {
      return setType('PROCESSING');
    }
    if (
      userInfo?.is_request_affiliates === '1' &&
      userInfo?.is_affiliates === '1'
    ) {
      return setType('SUCCESS');
    }
    setType('SIGNUP');
  }, [userInfo?.is_affiliates, userInfo?.is_request_affiliates]);

  const _onGoBack = () => {
    isSelectCity ? setIsSelectCity(false) : navigation.goBack();
  };

  const _onSubmitForm = values => {
    const formData = new FormData();
    formData.append('full_name', values.full_name);
    formData.append('phone', values.phone);
    formData.append('email', values.email);
    formData.append('address', values.address);
    formData.append('birthday', values.birthday / 1000);
    formData.append('province', values.province?.code);
    formData.append('district', values.district?.code);
    formData.append('ward', values.ward?.code);
    formData.append('bank_account_owner', values.bank_account_owner);
    formData.append('bank_account_number', values.bank_account_number);
    formData.append('bank_name', values.bank_name);
    formData.append('bank_branch', values.bank_branch);
    values.picture_list?.map((item, index) => {
      formData.append(`affiliate_picture[${index}]`, item);
    });

    dispatch({
      type: actions.SIGNUP_AFFILIATE,
      user,
      formData,
      onFinish: setType('PROCESSING'),
    });
  };

  const _renderContent = () => {
    if (type === 'SIGNUP') {
      return (
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validation}
          onSubmit={_onSubmitForm}>
          {props => (
            <FormAffiliate
              {...props}
              useSelectCity={[isSelectCity, setIsSelectCity]}
            />
          )}
        </Formik>
      );
    }
    if (type === 'PROCESSING') {
      return <FormProcessing />;
    }
    if (type === 'SUCCESS') {
      return <ListDeepLink friendly_link={route.params} />;
    }
    return null;
  };

  return (
    <Block flex backgroundColor="white">
      <Header
        canGoBack
        title={I18n.t('profileScreen.affiliate')}
        onGoBack={_onGoBack}
      />
      {_renderContent()}
      <Loading visible={isUserInfo} />
    </Block>
  );
};

export default AccountAffiliate;

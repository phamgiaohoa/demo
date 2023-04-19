import {icons} from '@assets';
import {
  Block,
  Button,
  FormContainer,
  FormInput,
  Header,
  Text,
} from '@components';
import actions, {_onUnmount} from '@redux/actions';
import {Formik} from 'formik';
import I18n from 'i18n';
import React, {useEffect, useRef, useState} from 'react';
import {Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ForgetSuccess from './components/ForgetSuccess';
import styles from './styles';
import {validation} from './validation';

const INITIAL_VALUES = {emailOrPhone: ''};

const ForgetPassScreen = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const valueInput = useRef();
  const {data, isLoading} = useSelector(state => state.forgetPassUser);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (data === 200) {
      setIsSuccess(true);
    }

    return () => dispatch({type: _onUnmount(actions.FORGOT_PASS_USER)});
  }, [data, dispatch]);

  const _onSubmit = values => {
    valueInput.current = values.emailOrPhone;
    dispatch({
      type: actions.FORGOT_PASS_USER,
      params: {
        email: values.emailOrPhone,
      },
    });
  };

  const _renderRightInput = () => (
    <Pressable onPress={() => inputRef.current.clear()}>
      <Image
        style={styles.iconClose}
        source={icons.close}
        resizeMode="contain"
      />
    </Pressable>
  );

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={_onSubmit}
      validationSchema={validation}>
      {({handleSubmit}) => (
        <Block flex backgroundColor="background">
          <Header canGoBack title={I18n.t('forgetPass.header')} />
          {isSuccess ? (
            <ForgetSuccess email={valueInput.current} />
          ) : (
            <FormContainer style={styles.content}>
              <Block marginTop={10}>
                <Text>{I18n.t('forgetPass.emailOfPhone')}</Text>
                <FormInput
                  setRef={inputRef}
                  name="emailOrPhone"
                  keyboardType="email-address"
                  style={styles.inputWrap}
                  inputStyle={styles.input}
                  containerStyle={styles.container}
                  errorContainerStyle={styles.error}
                  errorTextStyles={styles.errorText}
                  iconRight={_renderRightInput}
                />
              </Block>
              <Button
                disabled={isLoading}
                onPress={handleSubmit}
                title="LẤY LẠI MẬT KHẨU"
                style={styles.button}
              />
              <Text color="placeholder">
                {I18n.t('forgetPass.descriptionResetPass')}
              </Text>
            </FormContainer>
          )}
        </Block>
      )}
    </Formik>
  );
};

export default ForgetPassScreen;

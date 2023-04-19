import {icons} from '@assets';
import {Block, Button, FormInput, Text} from '@components';
import {theme} from '@theme';
import {useFormikContext} from 'formik';
import I18n from 'i18n';
import React from 'react';
import {Pressable} from 'react-native';
import styles from './styles';

const SignUpForm = ({isLoading, setModalPolicy, checkPolicy}) => {
  const {handleSubmit} = useFormikContext();

  return (
    <Block marginHorizontal={16} marginTop={10}>
      <FormInput
        name="full_name"
        iconLeft={icons.auth_user}
        placeholder={I18n.t('signUpScreen.fullName')}
        style={styles.textInput}
      />
      <FormInput
        name="email"
        iconLeft={icons.auth_email}
        placeholder="Email"
        style={styles.textInput}
      />
      <FormInput
        name="phone"
        keyboardType="number-pad"
        iconLeft={icons.auth_phone}
        placeholder={I18n.t('signUpScreen.phone')}
        style={styles.textInput}
      />
      <FormInput
        isSecure
        name="password"
        iconLeft={icons.auth_password}
        placeholder={I18n.t('signUpScreen.pass')}
        style={styles.textInput}
      />
      <FormInput
        isSecure
        name="rePassword"
        iconLeft={icons.auth_password}
        placeholder={I18n.t('signUpScreen.confirmPass')}
        style={styles.textInput}
      />
      <FormInput
        name="referral_code"
        iconLeft={icons.promoted}
        placeholder={I18n.t('signUpScreen.referral_code')}
        style={styles.textInput}
      />
      <Pressable onPress={setModalPolicy}>
        <Text size={12} center marginTop={16}>
          {I18n.t('signUpScreen.accept')}{' '}
          <Text size={12} color="blue" fontType="semibold">
            {I18n.t('signUpScreen.service')}
          </Text>
        </Text>
      </Pressable>

      <Button
        title={I18n.t('signUpScreen.register')}
        backgroundColor={theme.colors.btnColor}
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </Block>
  );
};

export default SignUpForm;

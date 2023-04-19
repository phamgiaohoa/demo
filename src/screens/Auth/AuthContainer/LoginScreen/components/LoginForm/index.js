import {icons} from '@assets';
import {Block, Button, FormInput, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import {theme} from '@theme';
import {useFormikContext} from 'formik';
import I18n from 'i18n';
import React from 'react';
import {Pressable} from 'react-native';
import styles from './styles';

const LoginForm = ({isLoading}) => {
  const navigation = useNavigation();
  const {handleSubmit} = useFormikContext();

  return (
    <Block paddingHorizontal={16} marginTop={10}>
      <FormInput
        name="username"
        iconLeft={icons.auth_user}
        placeholder={I18n.t('loginScreen.emailPhone')}
        style={styles.textInput}
      />
      <FormInput
        isSecure
        name="password"
        iconLeft={icons.auth_password}
        placeholder={I18n.t('loginScreen.pass')}
        style={styles.textInput}
      />
      <Pressable onPress={() => navigation.navigate(routes.FORGOT_PASS_SCREEN)}>
        <Text center size={12} color="blue" marginTop={16}>
          {I18n.t('loginScreen.forgot')}
        </Text>
      </Pressable>
      <Button
        title={I18n.t('loginScreen.login')}
        backgroundColor={theme.colors.btnColor}
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </Block>
  );
};

export default LoginForm;

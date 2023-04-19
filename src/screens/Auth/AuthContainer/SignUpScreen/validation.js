import I18n from 'i18n';
import {object, ref, string} from 'yup';

const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

export const signUpValidate = object().shape({
  full_name: string().required(I18n.t('signUpScreen.emptyUserName')),
  password: string()
    .min(6, I18n.t('signUpScreen.passSix'))
    .required(I18n.t('signUpScreen.emptyPass')),
  rePassword: string()
    .min(6)
    .required(I18n.t('signUpScreen.emptyConfirmPass'))
    .oneOf([ref('password'), null], I18n.t('signUpScreen.samePass')),
  email: string()
    .email(I18n.t('signUpScreen.emailFormat'))
    .required(I18n.t('signUpScreen.emptyEmail')),
  phone: string()
    .matches(phoneRegex, I18n.t('signUpScreen.phoneFormat'))
    .required(I18n.t('signUpScreen.emptyPhone')),
});

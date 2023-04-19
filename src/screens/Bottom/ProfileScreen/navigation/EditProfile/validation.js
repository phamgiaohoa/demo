import I18n from 'i18n';
import {object, ref, string} from 'yup';

export const Validation = object().shape({
  name: string().required(I18n.t('signUpScreen.emptyPass')),

  oldPass: string()
    .required(I18n.t('signUpScreen.emptyPass'))
    .min(6, I18n.t('signUpScreen.passSix')),

  newPass: string()
    .required(I18n.t('signUpScreen.emptyPass'))
    .min(6, I18n.t('signUpScreen.passSix')),

  rePass: string()
    .required(I18n.t('signUpScreen.emptyConfirmPass'))
    .min(6)
    .oneOf([ref('newPass'), null], I18n.t('signUpScreen.samePass')),
});

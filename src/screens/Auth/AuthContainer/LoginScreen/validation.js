import I18n from 'i18n';
import {object, string} from 'yup';

export const loginValidate = object().shape({
  username: string().required(I18n.t('loginScreen.emptyEmail')),
  password: string().required(I18n.t('loginScreen.emptyPass')),
});

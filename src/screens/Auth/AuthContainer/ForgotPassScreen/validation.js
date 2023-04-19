import I18n from 'i18n';
import {object, string} from 'yup';

export const validation = object().shape({
  emailOrPhone: string()
    .required(I18n.t('validation.email'))
    .email(I18n.t('validation.email_format')),
});

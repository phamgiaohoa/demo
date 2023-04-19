import I18n from 'i18n';
import {object, string} from 'yup';

export default object().shape({
  full_name: string().required(I18n.t('validation.full_name')),
  phone: string().required(I18n.t('validation.phone')),
  email: string()
    .required(I18n.t('validation.email'))
    .email(I18n.t('validation.email_format')),
  address: string().required(I18n.t('validation.address')),
  province: object().required(I18n.t('validation.province')),
  district: object().required(I18n.t('validation.district')),
  ward: object().required(I18n.t('validation.ward')),
});

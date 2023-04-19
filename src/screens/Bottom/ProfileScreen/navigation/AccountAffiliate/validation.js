import I18n from 'i18n';
import {array, object, string} from 'yup';

const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

export default object().shape({
  full_name: string().required(I18n.t('validation.name')),
  phone: string()
    .matches(phoneRegex, I18n.t('signUpScreen.phoneFormat'))
    .required(I18n.t('validation.phone')),
  email: string()
    .required(I18n.t('validation.email'))
    .email(I18n.t('validation.email_format')),
  birthday: string().required(I18n.t('validation.birthday')),
  address: string().required(I18n.t('validation.address')),
  province: object().required(I18n.t('validation.province')),
  district: object().required(I18n.t('validation.district')),
  ward: object().required(I18n.t('validation.ward')),
  bank_account_owner: string().required(I18n.t('validation.bankAccountOwner')),
  bank_account_number: string().required(
    I18n.t('validation.bankAccountNumber'),
  ),
  bank_name: string().required(I18n.t('validation.bankName')),
  bank_branch: string().required(I18n.t('validation.bankBranch')),
  picture_list: array().min(1, I18n.t('validation.pictureList')),
});

import I18n from 'i18n';
import {object, string} from 'yup';

export const Validation = object().shape({
  num_commission: string().required(I18n.t('commission.validation')),
});

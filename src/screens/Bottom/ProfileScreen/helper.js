import moment from 'moment';

export const DATE_START = 'DATE_START';

export const DATE_END = 'DATE_END';

export const formatDate = date => {
  return date ? moment(date).format('DD/MM/YYYY') : '';
};

export const getTimeForDate = date => {
  return new Date(date).getTime();
};

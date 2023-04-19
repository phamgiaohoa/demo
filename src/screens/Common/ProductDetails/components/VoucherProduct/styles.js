import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconVoucher: {
    width: getSize.s(18),
    height: getSize.s(18),
    resizeMode: 'contain',
    marginRight: getSize.m(8),
  },
  iconRight: {
    width: getSize.s(10),
    height: getSize.s(10),
    resizeMode: 'contain',
  },
  imageProduct: {
    width: getSize.s(60),
    height: getSize.s(60),
    resizeMode: 'contain',
  },
  btnSave: {
    alignSelf: 'center',
  },
});

import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  txtPrice: {
    width: getSize.s(66),
    height: getSize.s(18),
  },
  iconFlash: {
    width: getSize.s(18),
    height: getSize.s(18),
    marginLeft: getSize.m(5),
  },
});

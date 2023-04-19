import {width, getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageStyle: {
    width: width * 0.3,
    height: width * 0.2,
  },
  iconStyle: {
    height: getSize.s(12),
    width: getSize.s(12),
    marginHorizontal: getSize.m(8),
    marginTop: getSize.m(5),
  },
});

import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: getSize.s(100),
    height: getSize.s(100),
    marginVertical: getSize.m(8),
    marginLeft: getSize.m(8),
  },
  icoNew: {
    height: getSize.s(24),
    width: getSize.s(24),
  },
  pressablestyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeWrap: {
    padding: getSize.s(8),
    marginLeft: getSize.s(8),
  },
  close: {
    width: getSize.s(10),
    height: getSize.s(10),
  },
});

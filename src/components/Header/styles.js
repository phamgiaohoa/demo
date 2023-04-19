import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  icoBack: {
    height: getSize.s(20),
    width: getSize.s(20),
  },
  icoSearch: {
    height: getSize.s(24),
    width: getSize.s(24),
    marginHorizontal: getSize.m(12),
  },
  icoCart: {
    height: getSize.s(24),
    width: getSize.s(24),
  },
  btnBack: {
    paddingVertical: getSize.m(5),
    paddingRight: getSize.m(5),
  },
  btnOptions: {
    position: 'absolute',
    bottom: getSize.m(12),
    right: getSize.m(12),
  },
});

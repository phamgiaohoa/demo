import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  dotContainer: {
    bottom: 0,
    alignItems: 'flex-end',
  },
  dotItem: {
    width: getSize.s(10),
    height: getSize.s(3),
    borderRadius: getSize.m(5),
    marginHorizontal: getSize.m(5),
  },
});

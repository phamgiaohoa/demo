import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: getSize.s(100),
    height: getSize.s(150),
    marginVertical: getSize.m(8),
    marginLeft: getSize.m(8),
  },
  pressablestyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

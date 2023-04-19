import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: width * 0.25,
  },
  icoStyle: {
    height: getSize.s(45),
    width: getSize.s(45),
    marginBottom: getSize.m(10),
  },
});

import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconPer: {
    width: getSize.s(20),
    height: getSize.s(20),
    marginLeft: getSize.m(5),
  },
  itemProduct: {
    width: '100%',
    height: getSize.s(141),
  },
});

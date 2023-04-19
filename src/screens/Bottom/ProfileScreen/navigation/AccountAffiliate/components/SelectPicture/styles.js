import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btnWrapper: {
    borderRadius: getSize.m(5),
    marginTop: getSize.m(10),
    marginBottom: 0,
  },
  iconPlus: {
    width: getSize.s(30),
    height: getSize.s(30),
  },
  iconRemove: {
    width: getSize.s(15),
    height: getSize.s(15),
  },
});

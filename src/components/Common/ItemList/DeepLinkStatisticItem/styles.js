import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  avatar: {
    height: getSize.m(45),
    width: getSize.m(45),
    borderRadius: getSize.m(45),
    marginRight: getSize.m(10),
  },
  leftSide: {
    width: getSize.m(110),
  },
});

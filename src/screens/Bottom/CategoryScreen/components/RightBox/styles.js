import {width, getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  groupImage: {
    width: (width * 0.5) / 3,
    height: (width * 0.5) / 3,
    borderRadius: getSize.m(5),
  },
});

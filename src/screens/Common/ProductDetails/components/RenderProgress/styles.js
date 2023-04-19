import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  rating: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginRight: getSize.m(8),
  },
  AnimatedView: {
    height: getSize.s(5),
    borderRadius: getSize.m(15),
    backgroundColor: theme.colors.lightGray,
  },
});

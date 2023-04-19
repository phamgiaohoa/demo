import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  border: {
    borderTopWidth: getSize.m(1),
    borderColor: theme.colors.smoke,
  },
  checked: {
    width: getSize.s(10),
    height: getSize.s(10),
  },
});

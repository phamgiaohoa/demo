import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconInfo: {
    width: getSize.s(16),
    height: getSize.s(16),
    tintColor: theme.colors.placeholder,
    marginLeft: getSize.m(5),
  },
  optionStyle: {
    marginTop: getSize.m(20),
    width: getSize.s(220),
    backgroundColor: 'rgba(52,52,52,0.7)',
  },
});

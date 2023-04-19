import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconReferral: {
    width: getSize.s(22),
    height: getSize.s(22),
    marginRight: getSize.m(16),
    resizeMode: 'contain',
  },
  iconCopy: {
    width: getSize.s(18),
    height: getSize.s(18),
    marginLeft: getSize.m(8),
    tintColor: theme.colors.placeholder,
    resizeMode: 'contain',
  },
});

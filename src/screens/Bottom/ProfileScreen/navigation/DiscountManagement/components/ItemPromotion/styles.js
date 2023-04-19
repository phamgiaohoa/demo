import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: getSize.s(60),
    height: getSize.s(60),
  },
  iconInfo: {
    width: getSize.s(15),
    height: getSize.s(15),
    tintColor: theme.colors.placeholder,
  },
});

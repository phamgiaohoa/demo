import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    marginHorizontal: getSize.m(12),
    padding: getSize.m(10),
    borderRadius: getSize.m(5),
  },
  image: {
    width: getSize.s(100),
    height: getSize.s(100),
    borderRadius: getSize.m(5),
  },
  icoNew: {
    height: getSize.s(28),
    width: getSize.s(28),
  },
});

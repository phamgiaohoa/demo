import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.m(12),
    paddingBottom: getSize.m(12),
  },
  iconAffiliate: {
    tintColor: theme.colors.white,
    height: getSize.s(18),
    width: getSize.s(18),
  },
  iconHome: {
    width: getSize.s(15),
    height: getSize.s(15),
    tintColor: theme.colors.white,
  },
  iconNext: {
    width: getSize.s(10),
    height: getSize.s(10),
    tintColor: theme.colors.white,
    marginHorizontal: getSize.m(5),
  },
  textActive: {
    fontWeight: '700',
  },
});

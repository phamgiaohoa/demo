import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: index => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getSize.m(12),
    paddingVertical: getSize.m(16),
    borderTopWidth: index === 0 ? 0 : getSize.m(1),
    borderColor: theme.colors.smoke,
  }),
  iconLeft: {
    height: getSize.s(22),
    width: getSize.s(22),
    marginRight: getSize.m(16),
  },
  iconRight: {
    height: getSize.s(12),
    width: getSize.s(12),
    tintColor: theme.colors.placeholder,
  },
  badge: {
    left: getSize.m(5),
  },
});

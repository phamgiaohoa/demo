import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    borderBottomWidth: getSize.m(1),
    borderColor: theme.colors.smoke,
  },
  icon: {
    height: getSize.s(20),
    width: getSize.s(20),
    marginRight: getSize.m(16),
  },
  iconCheck: {
    height: getSize.s(20),
    width: getSize.s(20),
    marginRight: getSize.m(5),
  },
  btnChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeChange: top => ({
    position: 'absolute',
    right: getSize.m(12),
    top: top,
  }),
  iconFlag: {
    height: getSize.s(20),
    width: getSize.s(20),
    marginLeft: getSize.m(5),
  },
});

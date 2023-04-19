import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getSize.m(12),
    borderBottomWidth: getSize.m(1),
    borderColor: theme.colors.smoke,
  },
  iconHistory: {
    width: getSize.s(15),
    height: getSize.s(15),
    marginRight: getSize.m(10),
    tintColor: theme.colors.placeholder,
  },
  btnClose: {
    paddingLeft: getSize.m(10),
  },
  iconClose: {
    width: getSize.s(12),
    height: getSize.s(12),
    tintColor: theme.colors.placeholder,
  },
});

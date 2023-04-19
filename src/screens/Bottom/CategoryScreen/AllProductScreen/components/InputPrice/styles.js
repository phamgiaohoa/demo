import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    flex: 1,
    height: getSize.s(40),
    paddingLeft: getSize.m(10),
    color: 'black',
  },
  btnClose: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.placeholder,
    width: getSize.s(18),
    height: getSize.s(18),
    borderRadius: getSize.m(18),
  },
  iconClose: {
    width: getSize.s(8),
    height: getSize.s(8),
    tintColor: theme.colors.white,
  },
});

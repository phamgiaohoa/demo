import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btnSelect: {
    marginTop: getSize.m(30),
    paddingBottom: getSize.m(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: getSize.s(15),
    height: getSize.s(15),
    tintColor: theme.colors.lightGray,
  },
  icoWarning: {
    tintColor: theme.colors.red,
    height: getSize.s(11),
    width: getSize.s(11),
  },
});

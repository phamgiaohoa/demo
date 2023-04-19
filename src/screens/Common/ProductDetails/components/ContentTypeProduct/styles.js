import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: getSize.m(10),
    borderTopRightRadius: getSize.m(10),
  },
  image: {
    width: getSize.s(102),
    height: getSize.s(102),
    borderRadius: getSize.m(10),
  },
  minus: {
    width: getSize.s(10),
    tintColor: theme.colors.lightGray,
  },
  plus: {
    width: getSize.s(10),
    height: getSize.s(10),
    tintColor: theme.colors.black,
  },
  buttonCount: {
    width: getSize.m(38),
    height: getSize.m(28),
    backgroundColor: theme.colors.smoke,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    marginHorizontal: getSize.m(5),
  },
  btnFoot: {
    flex: 1,
    height: getSize.s(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getSize.m(5),
  },
  container: {
    padding: getSize.m(12),
  },
});

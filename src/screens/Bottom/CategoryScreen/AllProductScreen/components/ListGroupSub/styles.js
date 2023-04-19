import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  icoGroupSub: {
    height: getSize.s(35),
    width: getSize.s(35),
    borderRadius: getSize.m(35),
    marginRight: getSize.m(8),
    backgroundColor: theme.colors.blue,
  },
  icoGroupSub2: {
    height: getSize.s(30),
    width: getSize.s(30),
    borderRadius: getSize.m(30),
  },
  optionStyle: {
    width: width,
    backgroundColor: theme.colors.background,
  },
  sortWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: getSize.m(1),
    borderColor: theme.colors.smoke,
    padding: getSize.m(15),
    backgroundColor: theme.colors.white,
    marginBottom: getSize.m(12),
  },
  iconMenu: {
    width: getSize.s(18),
    height: getSize.s(18),
    tintColor: theme.colors.text,
    resizeMode: 'contain',
  },
  btnItem: {
    paddingVertical: getSize.m(3),
    paddingLeft: getSize.m(3),
    paddingRight: getSize.m(16),
    borderRadius: getSize.m(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  scrollView: {
    paddingHorizontal: getSize.m(10),
  },
});

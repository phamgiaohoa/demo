import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerSheet: {
    borderTopLeftRadius: getSize.m(10),
    borderTopRightRadius: getSize.m(10),
    backgroundColor: 'transparent',
  },
  wrapper: {
    width: getSize.s(50),
    height: getSize.s(8),
    borderRadius: getSize.m(10),
    backgroundColor: theme.colors.background,
  },
  btnComment: {
    width: getSize.s(45),
    height: getSize.s(45),
    backgroundColor: theme.colors.smoke,
    paddingVertical: getSize.m(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getSize.m(5),
  },
  iconComment: {
    width: getSize.s(20),
    height: getSize.s(20),
    tintColor: theme.colors.gray,
  },
  btnCart: {
    height: getSize.s(45),
    backgroundColor: theme.colors.smoke,
    paddingHorizontal: getSize.m(30),
    marginHorizontal: getSize.m(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getSize.m(5),
  },
  btnBuy: {
    flex: 1,
    height: getSize.s(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getSize.m(5),
  },
});

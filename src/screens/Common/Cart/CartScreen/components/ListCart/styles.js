import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    padding: getSize.m(12),
  },
  image: {
    width: getSize.s(70),
    height: getSize.s(70),
    borderRadius: getSize.m(5),
  },
  closeWrap: {
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getSize.m(5),
  },
  close: {
    width: getSize.s(10),
    height: getSize.s(10),
  },
  textLine: {
    textDecorationLine: 'line-through',
    marginRight: getSize.m(8),
  },
  minus: {
    width: getSize.s(10),
    tintColor: theme.colors.lightGray,
  },
  plus: {
    width: getSize.s(10),
    height: getSize.s(10),
    tintColor: theme.colors.placeholder,
  },
  buttonCount: {
    width: getSize.m(30),
    height: getSize.m(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: getSize.m(1),
    borderColor: theme.colors.smoke,
  },
  btnConfirmGift: {
    backgroundColor: theme.colors.orange,
    paddingVertical: getSize.m(8),
    paddingHorizontal: getSize.m(15),
    borderRadius: getSize.m(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

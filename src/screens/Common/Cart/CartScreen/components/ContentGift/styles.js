import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  itemWrap: opacity => ({
    opacity,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.m(8),
  }),
  iconCheck: {
    width: getSize.s(18),
    height: getSize.s(18),
    marginRight: getSize.m(15),
    resizeMode: 'contain',
  },
  picture: {
    width: getSize.s(45),
    height: getSize.s(45),
    marginRight: getSize.m(8),
    resizeMode: 'contain',
  },
  giftWrap: {
    paddingVertical: getSize.m(3),
    paddingHorizontal: getSize.m(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: getSize.m(0.5),
    borderColor: theme.colors.red,
  },
  btnConfirmGift: {
    backgroundColor: theme.colors.red,
    paddingVertical: getSize.m(8),
    paddingHorizontal: getSize.m(15),
    borderRadius: getSize.m(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

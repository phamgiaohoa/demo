import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconInfo: {
    width: getSize.s(16),
    height: getSize.s(16),
    tintColor: theme.colors.placeholder,
  },
  iconCoupon: {
    width: getSize.s(24),
    height: getSize.s(24),
    tintColor: theme.colors.orange,
    resizeMode: 'contain',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: getSize.m(1),
    paddingHorizontal: getSize.m(10),
    marginTop: getSize.m(10),
    borderRadius: getSize.m(5),
  },
  input: {
    padding: 0,
    marginLeft: getSize.m(10),
    paddingVertical: getSize.m(10),
    color: 'black',
  },
  optionStyle: {
    marginTop: getSize.m(30),
    marginLeft: getSize.m(100),
    width: getSize.s(220),
    backgroundColor: 'rgba(52,52,52,0.7)',
  },
  btnApply: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: getSize.m(15),
    paddingHorizontal: getSize.m(15),
    marginTop: getSize.m(10),
    borderRadius: getSize.m(5),
  },
  btnSee: {
    marginRight: getSize.m(10),
  },
});

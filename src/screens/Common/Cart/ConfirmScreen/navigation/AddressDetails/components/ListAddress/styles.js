import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    paddingHorizontal: getSize.m(12),
  },
  iconCheck: {
    width: getSize.s(22),
    height: getSize.s(22),
  },
  iconDefault: {
    width: getSize.s(15),
    height: getSize.s(15),

    tintColor: theme.colors.green,
  },
  iconMore: {
    width: getSize.s(15),
    height: getSize.s(15),
    tintColor: theme.colors.placeholder,
  },
  right: {
    marginRight: getSize.m(8),
  },
  textAddress: {
    marginTop: getSize.m(5),
  },
  btnAdd: {
    padding: getSize.m(12),
    marginTop: getSize.m(12),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionStyle: {
    marginTop: getSize.m(30),
    padding: getSize.m(10),
  },
  bottom: {
    marginBottom: getSize.m(10),
  },
  menuTrigger: {
    paddingVertical: getSize.m(10),
  },
});

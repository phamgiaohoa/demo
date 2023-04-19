import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btnSelect: {
    backgroundColor: theme.colors.smoke,
    padding: getSize.m(10),
    marginVertical: getSize.m(10),
    borderRadius: getSize.m(5),
    flexDirection: 'row',
  },
  check: {
    width: getSize.s(20),
    height: getSize.s(20),
    marginRight: getSize.m(5),
  },
  image: {
    width: getSize.s(70),
    height: getSize.s(60),
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  check: {
    width: getSize.s(20),
    height: getSize.s(20),
    marginRight: getSize.m(10),
  },
  input: {
    height: getSize.v(45),
    borderWidth: getSize.m(0.5),
    borderColor: theme.colors.placeholder,
    paddingHorizontal: getSize.m(10),
    marginTop: getSize.m(5),
    borderRadius: getSize.m(5),
    color: 'black',
  },
});

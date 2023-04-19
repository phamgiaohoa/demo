import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textInput: {
    height: getSize.s(45),
    backgroundColor: theme.colors.smoke,
    marginTop: getSize.m(10),
  },
  forgotPassword: {
    flexDirection: 'row',
    height: getSize.s(45),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: getSize.m(16),
  },
});

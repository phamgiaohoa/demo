import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    borderWidth: 0,
    borderRadius: getSize.m(5),
    paddingHorizontal: getSize.m(12),
    borderBottomWidth: getSize.m(0.5),
    borderColor: theme.colors.white,
    marginTop: getSize.m(10),
    marginBottom: getSize.m(10),
  },
  inputPhone: {
    borderWidth: 0,
    borderRadius: getSize.m(5),
    paddingHorizontal: getSize.m(12),
    borderColor: theme.colors.smoke,
  },
  btnConfirm: {
    borderRadius: getSize.m(5),
    marginHorizontal: getSize.m(12),
    marginBottom: 0,
  },
});

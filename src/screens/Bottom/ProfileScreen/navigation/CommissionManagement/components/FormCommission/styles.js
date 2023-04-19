import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputWrap: {
    paddingHorizontal: 0,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: getSize.m(1),
    borderBottomColor: theme.colors.smoke,
  },
  input: {
    paddingVertical: getSize.m(12),
    paddingHorizontal: 0,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  btnClose: {
    alignSelf: 'flex-end',
    marginBottom: getSize.m(5),
    marginLeft: getSize.m(5),
    paddingVertical: getSize.m(10),
  },
  iconClose: {
    width: getSize.s(10),
    height: getSize.s(10),
    tintColor: theme.colors.placeholder,
  },
  error: {
    paddingHorizontal: 0,
  },
});

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
    color: 'black',
  },
  input: {
    paddingVertical: getSize.m(10),
    paddingHorizontal: 0,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  phone: {
    justifyContent: 'flex-end',
  },
  btnClose: {
    alignSelf: 'flex-end',
    marginBottom: getSize.m(5),
    marginLeft: getSize.m(5),
    paddingVertical: getSize.m(10),
  },
  iconClose: {
    width: getSize.s(13),
    height: getSize.s(13),
    tintColor: theme.colors.placeholder,
  },
  birthday: {
    paddingVertical: getSize.m(10),
    borderBottomWidth: getSize.m(1),
    borderBottomColor: theme.colors.smoke,
  },
  radioBtn: {
    marginLeft: 0,
    marginRight: getSize.m(20),
  },
  error: {
    paddingHorizontal: 0,
  },
});

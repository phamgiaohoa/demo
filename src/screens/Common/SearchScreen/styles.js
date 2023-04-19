import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    height: getSize.s(45),
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 0,
    borderBottomWidth: getSize.m(1),
    borderColor: theme.colors.smoke,
    color: 'black',
  },
  contentInput: {
    height: getSize.s(45),
    marginBottom: getSize.m(12),
  },
  image: {
    height: getSize.s(40),
    width: getSize.s(40),
    borderRadius: getSize.m(5),
    marginRight: getSize.m(20),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getSize.m(10),
  },
  icon: {
    height: getSize.s(30),
    width: getSize.s(30),
    borderRadius: getSize.m(5),
    marginRight: getSize.m(20),
  },
  btnClose: {
    paddingLeft: getSize.m(10),
  },
  iconClose: {
    height: getSize.s(12),
    width: getSize.s(12),
    tintColor: theme.colors.placeholder,
  },
});

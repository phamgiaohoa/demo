import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    paddingHorizontal: 0,
    borderWidth: 0,
    height: getSize.m(45),
    marginBottom: getSize.m(10),
    borderBottomWidth: getSize.m(0.5),
    borderRadius: getSize.m(5),
  },
  error: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: getSize.m(5),
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: getSize.m(45),
    marginBottom: getSize.m(10),
    borderBottomWidth: getSize.m(0.5),
  },
  iconDown: {
    width: getSize.s(15),
    height: getSize.s(15),
    tintColor: theme.colors.lightGray,
  },
  buttonTitle: birthday => ({
    color: birthday ? theme.colors.black : theme.colors.placeholder,
  }),
});

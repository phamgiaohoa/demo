import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    borderWidth: getSize.m(0.5),
    borderColor: theme.colors.placeholder,
    padding: getSize.m(10),
    marginTop: getSize.m(10),
    borderRadius: getSize.m(5),
    height: getSize.s(80),
    textAlignVertical: 'top',
    color: 'black',
  },
});

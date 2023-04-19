import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
  line: {
    borderTopWidth: getSize.m(2),
    borderTopColor: theme.colors.smoke,
    paddingTop: getSize.m(5),
    marginTop: getSize.m(5),
  },
  btnContinue: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getSize.m(10),
    marginVertical: 0,
    borderRadius: getSize.m(5),
  },
  textButton: {
    fontSize: getSize.m(16),
  },
});

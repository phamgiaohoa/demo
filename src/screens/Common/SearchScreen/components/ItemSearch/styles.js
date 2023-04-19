import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    height: getSize.s(40),
    width: getSize.s(40),
    borderRadius: getSize.m(5),
    marginRight: getSize.m(20),
  },
  button: {
    flexDirection: 'row',
    paddingVertical: getSize.m(10),
    alignItems: 'center',
  },
});

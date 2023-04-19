import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconCopy: {
    height: getSize.s(18),
    width: getSize.s(18),
    marginLeft: getSize.m(10),
  },
  image: {
    height: getSize.s(50),
    width: getSize.s(50),
  },
  button: {
    borderRadius: getSize.m(5),
    marginHorizontal: getSize.m(12),
    marginBottom: getSize.m(30),
  },
  buttonCopy: {
    height: getSize.m(20),
    marginTop: 0,
    marginBottom: 0,
    borderRadius: getSize.m(5),
  },
});

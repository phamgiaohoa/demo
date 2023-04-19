import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  banner: {
    width: '100%',
    height: getSize.s(200),
  },
  itemWrap: {
    padding: getSize.m(10),
    borderRadius: getSize.m(5),
    backgroundColor: 'white',
  },
});

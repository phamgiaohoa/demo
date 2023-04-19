import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icoClose: {
    width: getSize.s(15),
    height: getSize.s(15),
  },
  image: {
    width: width,
    height: width,
  },
});

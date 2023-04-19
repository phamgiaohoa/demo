import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    paddingVertical: getSize.m(15),
    alignItems: 'center',
  },
  content: {
    width: width / 1.4,
    backgroundColor: 'white',
    borderRadius: getSize.m(5),
    zIndex: 20,
  },
});

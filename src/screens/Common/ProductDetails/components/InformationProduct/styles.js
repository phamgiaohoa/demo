import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  linearGradient: {
    width: width,
    position: 'absolute',
    bottom: 0,
    paddingTop: getSize.m(100),
  },
  btnViewDetails: {
    marginTop: getSize.m(12),
    marginBottom: getSize.m(6),
    alignItems: 'center',
  },
});

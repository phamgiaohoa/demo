import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  bannerHeader: size => ({
    width: getSize.s(390),
    height: size,
  }),
  contentWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  content: {
    paddingBottom: getSize.m(12),
  },
});

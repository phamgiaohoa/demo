import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getSize.s(45),
    height: getSize.s(45),
    borderRadius: getSize.m(45),
    marginBottom: getSize.m(5),
  },
  icon: config => ({
    width: getSize.s(25),
    height: getSize.s(25),
    resizeMode: 'contain',
    tintColor: config.general_active_color,
  }),
  scrollView: {
    marginTop: getSize.m(12),
    marginBottom: getSize.m(10),
  },
  badge: {
    position: 'absolute',
    top: getSize.m(-6),
    right: getSize.m(12),
  },
});

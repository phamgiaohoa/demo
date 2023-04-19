import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: (borderColor, scale, width) => ({
    borderColor,
    transform: [{scale}],
    width: getSize.s(width),
    height: getSize.s(width),
    padding: getSize.m(5),
    marginRight: getSize.m(10),
    borderRadius: getSize.m(5),
    borderWidth: getSize.m(2),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }),
  icon: width => ({
    width: getSize.s(width - 5),
    height: getSize.s(width - 5),
    tintColor: theme.colors.white,
    resizeMode: 'contain',
    zIndex: 20,
  }),
  background: widthIcon => ({
    width: widthIcon,
    height: widthIcon,
    backgroundColor: 'green',
    position: 'absolute',
  }),
});

import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  btnIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: getSize.s(35),
    width: getSize.s(35),
    borderRadius: getSize.m(35),
    margin: getSize.m(6),
  },
  icon: {
    height: getSize.s(18),
    width: getSize.s(18),
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
  },
  titleWrap: {
    flex: 1,
  },
  shadow: {
    height: getSize.m(0.5),
    width: width,
    backgroundColor: theme.colors.smoke,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textCart: {
    position: 'absolute',
    top: getSize.m(-2),
    right: getSize.m(-2),
    width: getSize.s(19),
    height: getSize.s(19),
    borderRadius: getSize.m(20),
    borderWidth: getSize.m(1),
    borderColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

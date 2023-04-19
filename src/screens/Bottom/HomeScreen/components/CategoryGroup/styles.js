import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    width: getSize.s(35),
    height: getSize.s(35),
  },
  topMenu: {
    position: 'absolute',
    paddingBottom: getSize.m(15),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: theme.colors.smoke,
    zIndex: 100,
  },
});

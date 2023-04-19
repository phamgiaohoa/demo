import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
  optionStyle: {
    marginTop: getSize.m(45),
    backgroundColor: 'transparent',
    shadowColor: '#fff',
  },
  iconMenu: {
    height: getSize.s(18),
    width: getSize.s(18),
    marginRight: getSize.m(6),
    tintColor: theme.colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: getSize.m(6),
    marginBottom: getSize.m(6),
  },
  shape: {
    position: 'absolute',
    top: getSize.m(-15),
    right: getSize.m(22),
    borderRightWidth: getSize.m(10),
    borderTopWidth: getSize.m(15),
    borderRightColor: 'transparent',
    borderTopColor: '#00000090',
    transform: [{rotate: '180deg'}],
  },
});

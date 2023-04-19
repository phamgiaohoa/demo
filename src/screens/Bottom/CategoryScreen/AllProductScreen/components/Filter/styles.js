import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  filter: {
    width: getSize.s(18),
    height: getSize.s(18),
    tintColor: theme.colors.gray,
  },
  optionStyle: {
    width: width,
    padding: getSize.m(12),
    backgroundColor: 'white',
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    paddingHorizontal: getSize.m(15),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  iconClose: {
    width: getSize.s(14),
    height: getSize.s(14),
    tintColor: theme.colors.placeholder,
    resizeMode: 'contain',
  },
  btnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: bottom => ({
    borderTopRightRadius: getSize.m(10),
    borderTopLeftRadius: getSize.m(10),
    backgroundColor: theme.colors.white,
    paddingBottom: Platform.OS === 'ios' ? bottom : getSize.m(15),
  }),
  headerModal: {
    padding: getSize.m(15),
    borderBottomWidth: getSize.m(1),
    borderColor: theme.colors.smoke,
  },
});

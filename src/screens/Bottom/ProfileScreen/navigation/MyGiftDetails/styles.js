import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  banner: top => ({
    width: '100%',
    height: getSize.m(300 + top),
    backgroundColor: 'white',
  }),
  btnClose: top => ({
    width: getSize.s(35),
    height: getSize.s(35),
    borderRadius: getSize.s(35),
    top: Platform.OS === 'ios' ? top : getSize.m(6),
    left: getSize.m(6),
    zIndex: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.dark,
  }),
  iconClose: {
    width: getSize.s(15),
    height: getSize.s(15),
    resizeMode: 'contain',
    tintColor: theme.colors.white,
  },
  itemWrap: {
    width: width / 2 - 6 - 12,
    padding: getSize.m(10),
    borderRadius: getSize.m(5),
    backgroundColor: 'white',
  },
  container: bottom => ({
    paddingBottom: Platform.OS === 'ios' ? bottom : getSize.m(12),
  }),
  wrapper: {
    justifyContent: 'space-between',
  },
  itemImage: {
    width: '100%',
    height: getSize.s(130),
  },
  itemBtn: config => ({
    backgroundColor: config.general_active_color,
    marginTop: getSize.m(8),
    borderRadius: getSize.m(5),
    paddingVertical: getSize.m(8),
    justifyContent: 'center',
    alignItems: 'center',
  }),
});

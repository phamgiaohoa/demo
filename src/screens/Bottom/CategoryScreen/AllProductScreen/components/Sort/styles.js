import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconMore: {
    width: getSize.s(18),
    height: getSize.s(18),
    tintColor: theme.colors.gray,
    marginRight: getSize.m(8),
  },
  row: isSelect => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isSelect ? theme.colors.smoke : theme.colors.white,
    paddingVertical: getSize.m(12),
    paddingHorizontal: getSize.m(20),
  }),
  icon: isSelect => ({
    width: getSize.s(14),
    height: getSize.s(14),
    marginRight: getSize.m(10),
    resizeMode: 'contain',
    tintColor: isSelect ? theme.colors.red : theme.colors.placeholder,
  }),
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: bottom => ({
    backgroundColor: 'white',
    borderTopRightRadius: getSize.m(10),
    borderTopLeftRadius: getSize.m(10),
    paddingBottom: Platform.OS === 'ios' ? bottom : getSize.m(15),
  }),
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
  headerModal: {
    padding: getSize.m(15),
    borderBottomWidth: getSize.m(1),
    borderColor: theme.colors.smoke,
  },
});

import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    height: getSize.m(45),
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 0,
    borderBottomWidth: getSize.m(1),
  },
  btnSelect: {
    marginTop: getSize.m(30),
    borderBottomWidth: getSize.m(1),
    paddingBottom: getSize.m(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: getSize.s(15),
    height: getSize.s(15),
    tintColor: theme.colors.lightGray,
  },
  iconCheck: {
    width: getSize.s(20),
    height: getSize.s(20),
  },
  boxSelect: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: getSize.m(12),
    marginTop: getSize.m(12),
  },
  right: {
    marginRight: getSize.m(10),
  },
  bottomWidth: {
    width: width,
    borderBottomWidth: getSize.m(0.5),
    borderColor: theme.colors.lightGray,
    paddingBottom: getSize.m(10),
  },
  btnDefault: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  top: {
    marginTop: getSize.m(10),
  },
  errorContainer: {
    paddingHorizontal: 0,
  },
  icoWarning: {
    tintColor: theme.colors.red,
    height: getSize.s(11),
    width: getSize.s(11),
  },
});

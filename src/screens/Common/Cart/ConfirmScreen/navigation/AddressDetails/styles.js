import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    borderBottomWidth: getSize.m(0.5),
    borderColor: theme.colors.lightGray,
    marginTop: getSize.m(15),
    paddingBottom: getSize.m(5),
  },
  btnSelect: {
    marginTop: getSize.m(30),
    borderBottomWidth: getSize.m(0.5),
    borderColor: theme.colors.lightGray,
    paddingBottom: getSize.m(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: getSize.s(20),
    height: getSize.s(20),
  },
  btnConfirmWrap: {
    paddingHorizontal: getSize.m(12),
    paddingBottom: getSize.m(10),
    backgroundColor: 'white',
  },
  button: {
    borderRadius: getSize.m(5),
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
});

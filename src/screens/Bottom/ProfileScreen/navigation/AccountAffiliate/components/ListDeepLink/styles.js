import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    flex: 1,
    height: getSize.m(45),
    borderBottomWidth: getSize.m(0.5),
    borderColor: theme.colors.lightGray,
    color: 'black',
  },
  linkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: getSize.m(10),
    paddingVertical: getSize.m(8),
    paddingHorizontal: getSize.m(10),
    borderRadius: getSize.m(5),
    backgroundColor: theme.colors.lightGreen,
  },
  iconCopy: {
    width: getSize.s(20),
    height: getSize.s(20),
    marginLeft: getSize.m(10),
    tintColor: theme.colors.placeholder,
  },
  iconClick: {
    width: getSize.s(18),
    height: getSize.s(18),
    marginRight: getSize.m(5),
  },
  btnDelete: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'white',
    borderRadius: getSize.m(20),
    padding: getSize.m(2),
  },
  iconDelete: {
    width: getSize.s(20),
    height: getSize.s(20),
  },
});

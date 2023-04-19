import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  filterButton: {
    height: getSize.s(40),
    borderRadius: getSize.m(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getSize.m(15),
    paddingHorizontal: getSize.m(10),
  },
});

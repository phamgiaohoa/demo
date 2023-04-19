import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btnStar: {
    height: getSize.s(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getSize.m(8),
    paddingHorizontal: getSize.m(15),
    borderRadius: getSize.m(5),
    marginBottom: getSize.m(10),
    marginHorizontal: getSize.m(5),
  },
  iconStar: {
    width: getSize.s(15),
    height: getSize.s(15),
    margin: getSize.m(5),
  },
});

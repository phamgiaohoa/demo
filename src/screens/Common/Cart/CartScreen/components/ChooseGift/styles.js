import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getSize.m(5),
  },
  iconGift: {
    width: getSize.m(30),
    height: getSize.m(30),
    marginLeft: getSize.m(1),
  },
});

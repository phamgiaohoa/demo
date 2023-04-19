import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: getSize.s(45),
    height: getSize.s(45),
    marginRight: getSize.m(8),
    resizeMode: 'contain',
  },
  itemWrap: {
    backgroundColor: 'white',
    borderRadius: getSize.m(5),
    padding: getSize.m(8),
    borderWidth: getSize.m(2),
  },
});

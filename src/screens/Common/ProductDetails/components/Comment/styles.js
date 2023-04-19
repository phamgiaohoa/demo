import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  rating: {
    alignSelf: 'flex-start',
    marginVertical: getSize.m(5),
  },
  imageRating: {
    height: getSize.s(50),
    width: getSize.s(50),
  },
});

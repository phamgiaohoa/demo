import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: getSize.m(60),
    height: getSize.m(60),
    marginRight: getSize.m(10),
    borderRadius: getSize.s(5),
  },
  imageList: {
    width: (width - 140) / 5,
    height: (width - 140) / 5,
    borderRadius: getSize.s(3),
    marginRight: getSize.m(5),
  },
  btnProduct: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: getSize.s(10),
    borderRadius: getSize.s(5),
  },
});

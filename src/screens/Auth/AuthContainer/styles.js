import {getSize, height, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  LinearHeader: {
    position: 'absolute',
    height: height / 1.5,
    width: width,
    marginTop: getSize.m(-260),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    width: getSize.s(150),
    height: getSize.s(150),
    marginTop: 200,
  },
  imageStyle: {
    width: getSize.s(11),
    height: getSize.s(13),
  },
  inputContainerStyle: {
    borderBottomWidth: getSize.m(0),
  },
  touchableStyle: {
    margin: getSize.m(20),
    flexDirection: 'row',
    marginHorizontal: getSize.m(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableDkhoang: {
    flexDirection: 'row',
    margin: 20,
  },
});

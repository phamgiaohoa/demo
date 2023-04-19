import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';
import {width} from 'utils/responsive';

export default StyleSheet.create({
  lottie: {
    height: getSize.s(150),
    width: getSize.s(150),
    marginBottom: getSize.m(20),
  },
  btnGoBack: {
    width: width - 32,
    borderRadius: getSize.m(5),
  },
});

import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentWrap: {
    justifyContent: 'space-between',
  },
  itemProduct: {
    width: '100%',
    height: getSize.s(141),
  },
});

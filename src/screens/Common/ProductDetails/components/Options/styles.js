import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  block: {
    paddingVertical: getSize.m(8),
    paddingHorizontal: getSize.m(20),
    borderWidth: getSize.m(1),
    marginRight: getSize.m(10),
    borderRadius: getSize.m(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getSize.m(10),
  },
});

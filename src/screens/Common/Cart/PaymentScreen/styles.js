import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconCoupon: {
    width: getSize.s(24),
    height: getSize.s(24),
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: getSize.m(1),
    paddingHorizontal: getSize.m(10),
    marginTop: getSize.m(10),
    borderRadius: getSize.m(5),
  },
  input: {
    padding: 0,
    marginLeft: getSize.m(10),
    paddingVertical: getSize.m(10),
    color: 'black',
  },
});

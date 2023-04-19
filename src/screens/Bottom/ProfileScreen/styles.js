import {height, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btnLogout: {
    width: width * 0.8,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  container: {
    paddingTop: height / 6,
  },
});

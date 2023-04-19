import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    borderWidth: getSize.m(0.5),
    borderColor: theme.colors.smoke,
    padding: getSize.m(10),
    marginTop: getSize.m(12),
    borderRadius: getSize.m(5),
    height: getSize.s(140),
    textAlignVertical: 'top',
    backgroundColor: theme.colors.background,
    color: 'black',
  },
  icon: {
    height: getSize.s(16),
    width: getSize.s(16),
    marginRight: getSize.m(10),
  },
  image: {
    height: getSize.s(50),
    width: getSize.s(50),
  },
  btnSubmit: {
    borderRadius: getSize.m(5),
    margin: getSize.m(12),
    marginBottom: getSize.m(30),
    marginTop: getSize.m(0),
  },
  btnAddImage: config => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: getSize.m(5),
    height: getSize.s(45),
    borderColor: config.general_active_color,
    borderStyle: 'dashed',
    backgroundColor: `${config.general_active_color}10`,
    marginHorizontal: getSize.m(12),
  }),
  imagelist: {
    height: (width - 48) / 5,
    width: (width - 48) / 5,
  },
});

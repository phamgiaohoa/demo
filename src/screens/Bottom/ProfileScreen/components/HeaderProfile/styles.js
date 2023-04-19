import {theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

const HEIGHT = getSize.s(140);

export default StyleSheet.create({
  container: scrollY => ({
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 20,
    borderColor: theme.colors.smoke,
    borderBottomWidth: scrollY.interpolate({
      inputRange: [getSize.s(139), HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  }),
  btnEdit: scrollY => ({
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [width / 8, width / 4.9],
      extrapolate: 'clamp',
    }),
    right: getSize.m(12),
    borderRadius: getSize.m(22),
    zIndex: 20,
    backgroundColor: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [theme.colors.dark, theme.colors.smoke],
      extrapolate: 'clamp',
    }),
    width: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [getSize.s(28), getSize.s(25)],
      extrapolate: 'clamp',
    }),
    height: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [getSize.s(28), getSize.s(25)],
      extrapolate: 'clamp',
    }),
  }),
  iconPencil: scrollY => ({
    width: getSize.s(12),
    height: getSize.s(12),
    resizeMode: 'contain',
    tintColor: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [theme.colors.white, theme.colors.blue],
      extrapolate: 'clamp',
    }),
  }),
  avatarWrap: scrollY => ({
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    transform: [
      {
        translateX: scrollY.interpolate({
          inputRange: [0, getSize.s(120)],
          outputRange: [0, -getSize.s(150)],
          extrapolate: 'clamp',
        }),
      },
    ],
    marginTop: scrollY.interpolate({
      inputRange: [0, getSize.s(120)],
      outputRange: [0, getSize.m(35)],
      extrapolate: 'clamp',
    }),
    opacity: scrollY.interpolate({
      inputRange: [-1, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  }),
  avatar: scrollY => ({
    width: scrollY.interpolate({
      inputRange: [0, getSize.s(120)],
      outputRange: [getSize.s(100), getSize.s(70)],
      extrapolate: 'clamp',
    }),
    height: scrollY.interpolate({
      inputRange: [0, getSize.s(120)],
      outputRange: [getSize.s(100), getSize.s(70)],
      extrapolate: 'clamp',
    }),
    borderRadius: getSize.m(100),
  }),
  imagePicker: scrollY => ({
    position: 'absolute',
    bottom: 5,
    right: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [10, 5],
      extrapolate: 'clamp',
    }),
  }),
  iconPicker: scrollY => ({
    width: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [getSize.s(25), getSize.s(20)],
      extrapolate: 'clamp',
    }),
    height: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [getSize.s(25), getSize.s(20)],
      extrapolate: 'clamp',
    }),
  }),
  bannerWrap: (scrollY, config) => ({
    width: '100%',
    height: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [getSize.s(130), 0],
      extrapolate: 'clamp',
    }),
    opacity: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        scale: scrollY.interpolate({
          inputRange: [-HEIGHT, 0],
          outputRange: [1.1, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
    backgroundColor: config.general_active_color,
  }),
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    transform: [{translateY: getSize.m(30)}],
  },
  infoWrap: scrollY => ({
    width: '100%',
    height: getSize.s(130),
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [getSize.m(60), width / 8],
      extrapolate: 'clamp',
    }),
    padding: getSize.m(12),
    opacity: scrollY.interpolate({
      inputRange: [-1, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  }),
  textInfo: scrollY => ({
    justifyContent: 'center',
    alignItems: 'center',
    opacity: scrollY.interpolate({
      inputRange: [0, getSize.s(50)],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    width: scrollY.interpolate({
      inputRange: [0, getSize.s(100)],
      outputRange: [width - getSize.m(24), 0],
      extrapolate: 'clamp',
    }),
  }),
  textInfo1: scrollY => ({
    justifyContent: 'center',
    opacity: scrollY.interpolate({
      inputRange: [getSize.s(100), getSize.s(120)],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    width: scrollY.interpolate({
      inputRange: [getSize.s(70), HEIGHT],
      outputRange: [0, width - getSize.s(140)],
      extrapolate: 'clamp',
    }),
  }),
  avatarFake: scrollY => ({
    width: scrollY.interpolate({
      inputRange: [0, getSize.s(70)],
      outputRange: [0, getSize.s(80)],
      extrapolate: 'clamp',
    }),
    height: '100%',
  }),
  editFake: scrollY => ({
    width: scrollY.interpolate({
      inputRange: [0, HEIGHT],
      outputRange: [0, getSize.s(30)],
      extrapolate: 'clamp',
    }),
    height: '100%',
  }),
});

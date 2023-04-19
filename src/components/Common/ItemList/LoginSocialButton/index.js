import {Block, Text} from '@components';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const LoginSocialButton = ({title, backgroundColor, color, icon, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Block
        shadow
        row
        alignCenter
        justifyCenter
        backgroundColor={backgroundColor}
        height={45}
        width="100%"
        borderRadius={45}
        marginBottom={10}>
        <Block width={50} justifyCenter alignCenter>
          <Image source={icon} style={styles.imgAuth} resizeMode="cover" />
        </Block>
        <Block alignCenter flex marginLeft={-50}>
          <Text fontType="semibold" color={color}>
            {title}
          </Text>
        </Block>
      </Block>
    </Pressable>
  );
};

export default LoginSocialButton;

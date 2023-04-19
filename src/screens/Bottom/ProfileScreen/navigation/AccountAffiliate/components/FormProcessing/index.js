import {lottie} from '@assets';
import {Block, Text} from '@components';
import LottieView from 'lottie-react-native';
import React from 'react';

const FormProcessing = () => {
  return (
    <Block flex justifyCenter alignCenter paddingBottom={100}>
      <Block width={110} height={110}>
        <LottieView source={lottie.mail_send} autoPlay loop />
      </Block>
      <Text size={16}>Tài khoản đang chờ duyệt...</Text>
    </Block>
  );
};

export default FormProcessing;

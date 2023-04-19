import {Block, Text, WebView} from '@components';
import {height, width} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {Modal, Pressable} from 'react-native';
import {useSelector} from 'react-redux';

const PolicyModal = ({visible, data, onPress}) => {
  const config = useSelector(state => state.config.data);

  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <Block flex justifyCenter alignCenter>
        <Block
          height={height * 0.8}
          width={width - 40}
          borderRadius={20}
          backgroundColor="white"
          justifyCenter>
          <Block flex padding={12} paddingBottom={20}>
            <WebView data={data} />
          </Block>
          <Pressable
            alignItems="center"
            justifyContent="center"
            height={45}
            borderRadius={45}
            margin={20}
            backgroundColor={config.general_active_color}
            onPress={onPress}>
            <Text
              marginRight={10}
              fontType="semibold"
              color={config.general_font_color}>
              {I18n.t('signUpScreen.accept_terms')}
            </Text>
          </Pressable>
        </Block>
      </Block>
    </Modal>
  );
};

export default PolicyModal;

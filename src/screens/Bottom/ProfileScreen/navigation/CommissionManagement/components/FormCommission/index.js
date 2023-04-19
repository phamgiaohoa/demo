import {icons} from '@assets';
import {Block, FormInput, Text} from '@components';
import I18n from 'i18n';
import React, {useRef} from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const FormCommission = () => {
  const inputNumCode = useRef();

  const _onClearInput = input => {
    input.current.clear();
    input.current.focus();
  };

  const _renderInputPass = (
    ref,
    title,
    nameInput,
    keyboardType = 'default',
  ) => {
    return (
      <Block marginBottom={10}>
        <Block row alignCenter>
          <FormInput
            setRef={ref}
            placeholder={title}
            name={nameInput}
            style={styles.inputWrap}
            inputStyle={styles.input}
            containerStyle={styles.container}
            errorContainerStyle={styles.error}
            keyboardType={keyboardType}
            returnKeyType="done"
            iconRight={() => (
              <Pressable
                style={styles.btnClose}
                onPress={() => _onClearInput(ref)}>
                <Image
                  style={styles.iconClose}
                  source={icons.close}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          />
        </Block>
      </Block>
    );
  };

  return (
    <Block flex>
      <Text margin={12} fontType="light">
        {I18n.t('commission.note')}
      </Text>
      <Block backgroundColor="white" padding={12}>
        {_renderInputPass(
          inputNumCode,
          I18n.t('commission.input_conversion'),
          'num_commission',
          'number-pad',
        )}
      </Block>
    </Block>
  );
};

export default FormCommission;

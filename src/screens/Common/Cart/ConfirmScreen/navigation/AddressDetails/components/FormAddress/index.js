/* eslint-disable no-unused-vars */
import {icons} from '@assets';
import {Block, FormContainer, FormInput, Text} from '@components';
import {theme} from '@theme';
import {useField} from 'formik';
import I18n from 'i18n';
import React from 'react';
import {Image, Pressable} from 'react-native';
import FormButton from '../FormButton';
import styles from './styles';

const FormAddress = ({setIsCheckSelect}) => {
  const [fullNameField, fullNameMeta, fullNameHelpers] = useField({
    name: 'full_name',
  });
  const [phoneField, phoneMeta, phoneHelpers] = useField({
    name: 'phone',
  });
  const [emailField, emailMeta, emailHelpers] = useField({
    name: 'email',
  });
  const [addressField, addressMeta, addressHelpers] = useField({
    name: 'address',
  });
  const [provinceField, provinceMeta, provinceHelpers] = useField({
    name: 'province',
  });
  const [districtField, districtMeta, districtHelpers] = useField({
    name: 'district',
  });
  const [wardField, wardMeta, wardHelpers] = useField({
    name: 'ward',
  });
  const [isDefaultField, isDefaultMeta, isDefaultHelpers] = useField({
    name: 'is_default',
  });
  const isFullName = fullNameMeta.touched && fullNameMeta.error;
  const isPhone = phoneMeta.touched && phoneMeta.error;
  const isEmail = emailMeta.touched && emailMeta.error;
  const isAddress = addressMeta.touched && fullNameMeta.error;

  return (
    <FormContainer>
      <Block padding={12} backgroundColor="white" paddingBottom={20}>
        <Text marginBottom={8} fontType="bold">
          {I18n.t('cart.enterDelivery')}
        </Text>

        <FormInput
          name="full_name"
          style={{
            ...styles.input,
            borderColor: isFullName ? theme.colors.red : theme.colors.smoke,
          }}
          placeholder={I18n.t('cart.inputName')}
          errorContainerStyle={styles.errorContainer}
        />
        <FormInput
          name="phone"
          style={{
            ...styles.input,
            borderColor: isPhone ? theme.colors.red : theme.colors.smoke,
          }}
          keyboardType="phone-pad"
          placeholder={I18n.t('cart.inputPhone')}
          errorContainerStyle={styles.errorContainer}
        />
        <FormInput
          name="email"
          style={{
            ...styles.input,
            borderColor: isEmail ? theme.colors.red : theme.colors.smoke,
          }}
          keyboardType="email-address"
          placeholder={'Email'}
          errorContainerStyle={styles.errorContainer}
        />
        <FormInput
          name="address"
          style={{
            ...styles.input,
            borderColor: isAddress ? theme.colors.red : theme.colors.smoke,
          }}
          placeholder={I18n.t('cart.inputAddress')}
          errorContainerStyle={styles.errorContainer}
        />
        <FormButton
          name="province"
          label={provinceField.value.title || I18n.t('cart.province')}
          onPress={() => setIsCheckSelect(true)}
        />
        <FormButton
          name="district"
          label={districtField.value.title || I18n.t('cart.district')}
          onPress={() => setIsCheckSelect(true)}
        />
        <FormButton
          name="ward"
          label={wardField.value.title || I18n.t('cart.ward')}
          onPress={() => setIsCheckSelect(true)}
        />
      </Block>

      <Block style={styles.boxSelect}>
        <Pressable
          onPress={() => {
            Number(isDefaultField.value) === 1
              ? isDefaultHelpers.setValue(0)
              : isDefaultHelpers.setValue(1);
          }}
          style={styles.btnDefault}>
          <Image
            style={{
              ...styles.iconCheck,
              ...styles.right,
              tintColor:
                isDefaultField.value === 1
                  ? theme.colors.green
                  : theme.colors.lightGray,
            }}
            source={isDefaultField.value === 1 ? icons.check_box : icons.square}
            resizeMode="contain"
          />
          <Text>{I18n.t('cart.addressDefault')}</Text>
        </Pressable>
      </Block>
    </FormContainer>
  );
};

export default FormAddress;

import {Block, CheckBox, Text, TextInput} from '@components';
import {theme} from '@theme';
import I18n from 'i18n';
import React, {useState} from 'react';
import styles from './styles';

const FormBill = ({onTextEmail, onTextVat, onTextAddress}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Block backgroundColor={theme.colors.white} padding={10} marginTop={10}>
      <CheckBox
        title={I18n.t('cart.invoice')}
        value={toggle}
        setValue={setToggle}
      />

      {toggle && (
        <Block marginTop={15}>
          <Block marginTop={10}>
            <Text>
              {I18n.t('cart.companyName')}{' '}
              <Text color={theme.colors.red}>(*)</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={I18n.t('cart.enterEmail')}
              onChangeText={onTextEmail}
            />
          </Block>

          <Block marginTop={10}>
            <Text>
              {I18n.t('cart.taxCode')} <Text color={theme.colors.red}>(*)</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={I18n.t('cart.enterTax')}
              onChangeText={onTextVat}
            />
          </Block>

          <Block marginTop={10}>
            <Text>
              {I18n.t('cart.addressOrder')}{' '}
              <Text color={theme.colors.red}>(*)</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={I18n.t('cart.enterAddress')}
              onChangeText={onTextAddress}
            />
          </Block>
        </Block>
      )}
    </Block>
  );
};

export default FormBill;
